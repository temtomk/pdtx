const axios = require("axios");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// MongoDB 연결 URI 설정
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

// 파일에 현재 탐색한 블록 높이 저장
function saveCurrentBlockHeight(height) {
  const filePath = path.join(__dirname, "currentBlockHeight.txt");
  fs.writeFileSync(filePath, height.toString());
}

// 파일에서 현재 탐색한 블록 높이 읽기
function readCurrentBlockHeight() {
  const filePath = path.join(__dirname, "currentBlockHeight.txt");
  if (fs.existsSync(filePath)) {
    const height = fs.readFileSync(filePath, "utf-8");
    return parseInt(height);
  }
  return null;
}

// Base64를 UTF-8로 디코딩하는 함수
const base64Decode = (encoded) => {
  try {
    return Buffer.from(encoded, "base64").toString("utf-8");
  } catch (error) {
    console.error("Base64 디코딩 오류:", error);
    return null;
  }
};

function findBase64Strings(inputString) {
  var base64Pattern = /[A-Za-z0-9+/]+={0,2}/g;
  var base64Matches = inputString.match(base64Pattern);

  if (base64Matches && base64Matches.length > 0) {
    return base64Matches
      .filter((match) => match.includes("eyJwIjo"))
      .map((match) => match.substring(match.indexOf("eyJwIjo")));
  } else {
    return [];
  }
}

function findAndParseJsonFromBase64Array(dataArray) {
  const resultArray = [];
  for (const data of dataArray) {
    try {
      const decodedData = base64Decode(data);
      const jsonData = JSON.parse(decodedData);
      // FROM과 TO 필드 추가
      jsonData.from = jsonData.FROM;
      jsonData.to = jsonData.TO;
      resultArray.push(jsonData);
    } catch (error) {
      // JSON 형태가 아니거나 오류 발생 시 무시
    }
  }

  return resultArray;
}

// 유효성 검사를 위한 상수
const MAX_UINT64 = BigInt("18446744073709551615"); // uint64의 최대값

// 숫자 필드의 유효성 검사 함수
function isValidNumberField(value) {
  const number = BigInt(value);
  return !isNaN(number) && number > 0n && number <= MAX_UINT64;
}

// 특정 블록의 정보를 가져오는 함수
async function fetchBlockInfo(height) {
  try {
    const response = await axios.get(
      `https://finschia-rpc.finschia.io/block?height=${height}`
    );
    if (response.data && response.data.error) {
      return { error: true, message: response.data.error.message };
    }
    return response.data;
  } catch (error) {
    console.error(`블록 ${height}의 데이터를 가져오는 중 오류 발생:`, error);
    return { error: true, message: error.message };
  }
}

// 'mint' 작업에 대한 총 'amt' 계산 함수
async function getTotalMintedAmtForTick(tick) {
  const result = await client
    .db("FINRC-20")
    .collection("Mint")
    .aggregate([
      { $match: { tick: tick, op: "mint" } },
      { $group: { _id: null, totalAmt: { $sum: { $toInt: "$amt" } } } },
    ])
    .toArray();
  return result.length > 0 ? result[0].totalAmt : 0;
}

// 계산된 amt 수를 반환하는 함수
async function calculateAdjustedAmounts() {
  try {
    const mintCollection = client.db("FINRC-20").collection("Mint");
    const transferCollection = client.db("FINRC-20").collection("Transfer");

    // Mint 컬렉션에서 각 주소의 초기 amt 수 계산
    const initialAmts = await mintCollection
      .aggregate([
        { $match: { p: "finrc-20", op: "mint", tick: "PDTX" } },
        { $group: { _id: "$to", totalAmt: { $sum: { $toInt: "$amt" } } } },
      ])
      .toArray();

    const addressAmtMap = new Map(
      initialAmts.map(({ _id, totalAmt }) => [_id, totalAmt])
    );

    // Transfer 컬렉션에서 amt 변동 추적
    const transfers = await transferCollection
      .find({ p: "finrc-20", op: "transfer", tick: "PDTX" })
      .toArray();

    transfers.forEach(({ from, to, amt }) => {
      const amtNumber = parseInt(amt, 10);
      if (from !== to) {
        addressAmtMap.set(from, (addressAmtMap.get(from) || 0) - amtNumber);
        addressAmtMap.set(to, (addressAmtMap.get(to) || 0) + amtNumber);
      }
    });
    return Object.fromEntries(addressAmtMap);
  } catch (error) {
    console.error("데이터 처리 중 오류 발생:", error);
    throw error;
  }
}

async function filterAndSaveTransactions(data, height) {
  // 지갑 잔액 계산
  const walletBalances = await calculateAdjustedAmounts();
  if (data?.result?.block?.data?.txs) {
    const clientDb = client.db("FINRC-20");

    for (const encodedTx of data.result.block.data.txs) {
      const decodedTx = base64Decode(encodedTx);

      // link1 포함 단어 찾기 (디코딩된 데이터에서)
      const link1Matches = decodedTx.match(/link1[a-z0-9]{38}/g);
      let fromAddress = "",
        toAddress = "";
      if (link1Matches && link1Matches.length >= 2) {
        fromAddress = link1Matches[0];
        toAddress = link1Matches[1];
      }

      const base64Strings = findBase64Strings(decodedTx);
      const jsonObjects = findAndParseJsonFromBase64Array(base64Strings);

      // jsonObjects 배열 내에서 'from' 및 'to' 필드의 값을 문자열에서 JavaScript 객체의 속성으로 변환
      for (const obj of jsonObjects) {
        if (
          !obj.p ||
          obj.p !== "finrc-20" ||
          !obj.op ||
          !["deploy", "mint", "transfer"].includes(obj.op.toLowerCase()) ||
          !obj.tick
        ) {
          continue;
        }
        console.warn(obj.tick);

        // 'tick' 값을 대문자로 변환
        obj.tick = obj.tick.toUpperCase();

        // obj.amt 값을 정수로 변환
        obj.amt = parseInt(obj.amt, 10);

        // 'from' 및 'to' 필드의 값을 객체 속성으로 변환
        obj.from = fromAddress;
        obj.to = toAddress;
        console.warn(obj);

        if (obj.op.toLowerCase() === "deploy") {
          // 'Deploy' 콜렉션에 저장
          const deployCollection = clientDb.collection("Deploy");

          if (!isValidNumberField(obj.max)) {
            continue;
          }
          obj.lim = obj.lim
            ? isValidNumberField(obj.lim)
              ? obj.lim
              : obj.max
            : obj.max;

          const existingDeploy = await deployCollection.findOne({
            op: "deploy",
            tick: obj.tick,
          });

          if (!existingDeploy) {
            await deployCollection.insertOne(obj);
          }
        } else if (obj.op.toLowerCase() === "mint") {
          // 'Mint' 콜렉션에 저장

          const mintCollection = clientDb.collection("Mint");

          const deployRecord = await clientDb
            .collection("Deploy")
            .findOne({ op: "deploy", tick: obj.tick });

          if (!deployRecord) {
            continue;
          }

          const totalMintedAmt = await getTotalMintedAmtForTick(obj.tick);
          const totalMintedAmtBigInt = BigInt(totalMintedAmt);
          let mintAmt = BigInt(obj.amt);

          // mintAmt가 deploy 트랜잭션들이 들어왔을 당시의 lim 값보다 큰 경우 무시
          if (mintAmt > BigInt(deployRecord.lim)) {
            continue;
          }

          if (totalMintedAmtBigInt + mintAmt > BigInt(deployRecord.max)) {
            mintAmt = BigInt(deployRecord.max) - totalMintedAmtBigInt;
            obj.amt = mintAmt.toString();
          }

          await mintCollection.insertOne(obj);
        } else if (obj.op.toLowerCase() === "transfer") {
          // 'Transfer' 콜렉션에 저장
          const transferCollection = clientDb.collection("Transfer");

          const fromBalance = BigInt(walletBalances[obj.from] || 0);
          console.warn(obj.from);
          console.warn(fromBalance);
          if (fromBalance >= BigInt(obj.amt)) {
            await transferCollection.insertOne(obj);
          }
        }
      }
    }
  } else {
    console.warn(`블록 ${height}은(는) 블록 데이터가 부족하여 스킵합니다.`);
  }
}

// fetchDataAndAppend 함수
async function fetchDataAndAppend(startBlock, endBlock) {
  await client.connect();

  const savedBlockHeight = readCurrentBlockHeight();
  const currentBlockHeight = savedBlockHeight + 1 || startBlock;

  for (let height = currentBlockHeight; height <= endBlock; height++) {
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      const data = await fetchBlockInfo(height);
      if (data.error) {
        console.error(
          `블록 ${height} 데이터 가져오기 중 오류 발생: 재시도 ${attempts + 1}/${maxAttempts}, 메시지: ${data.message}`
        );
        attempts++;
        if (attempts >= maxAttempts) {
          console.error(
            `블록 ${height} 데이터 가져오기 실패: 최대 재시도 횟수 초과`
          );
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }

      await filterAndSaveTransactions(data, height);
      console.log(`블록 ${height}의 데이터가 MongoDB에 저장되었습니다.`);
      saveCurrentBlockHeight(height);
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  await client.close();
}

// 실행
fetchDataAndAppend(61855487, 99999999);
