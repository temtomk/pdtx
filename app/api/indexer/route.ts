import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utils/db-connect";

let db;

(async function () {
  let collection = "mints";
  let database = "godfinshia";
  if (process.env.NODE_ENV == "development") {
    collection = "tests";
  }
  db = (await connectDB).db(database).collection(collection);
});

export async function GET() {
  function readCurrentBlockHeight() {
    const filePath = path.join(__dirname, "currentBlockHeight.txt");
    if (fs.existsSync(filePath)) {
      const height = fs.readFileSync(filePath, "utf-8");
      return parseInt(height);
    }
    return null;
  }
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
}

export async function POST() {
  return NextResponse.json({ message: "hello" });
}
