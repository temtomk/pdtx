'use client';

import React, { useContext, useState } from "react";
import { WalletContext } from "./wallet";
import ChainInfo from "./data/chain-info-ebony";
import { postMinting } from "./db";

const Minting = () => {
  const { client, accounts } = useContext(WalletContext);
  const [txResponse, setTxResponse] = useState(null);
  
  const minting = async () => {
    if (client && accounts) {
      const sendTokensTo = async (address, amount, memo) => {
        try {
          let deliverTxResponse = await client.sendTokens(
            accounts[0].address,
            address,
            [
              {
                denom: ChainInfo.currencies[0].coinMinimalDenom,
                amount: amount,
              },
            ],
            "auto",
            memo
          );
          console.log("Transaction Response", deliverTxResponse);
          await setTxResponse(deliverTxResponse); // 상태 업데이트
          if (deliverTxResponse.transactionHash) {
            await postMinting({ address: address, token: amount, txhash: deliverTxResponse.transactionHash });
          }
        } catch (e) {
          console.warn("Error sending tokens", e);
          setTxResponse(null); // 에러가 발생하면 상태를 null로 설정
        }
      };

      var recipientAddress = accounts[0].address;
      var amount = "7890"; // 보낼 토큰의 양
      var memo = '{"p":"frc-20","op":"mint","tick":"TEST","amt":"1000"}'; // 메모

      sendTokensTo(recipientAddress, amount, memo);
    }
  };

  return (
    <>
      <button
        className="text-white text-center text-2xl tracking-[2.88px] whitespace-nowrap grow justify-center items-stretch bg-red-600 border px-12 py-3.5 rounded-[32px] max-md:px-5 max-sm:items-center max-sm:max-w-[154px] max-sm:mx-auto"
        onClick={minting}
      >
        MINT
      </button>
    </>
  );
};

export default Minting;
