"use client";

import React, { useContext, useState } from "react";
import { WalletContext } from "./wallet";
import { chainInfo } from "../utils/chain-info";

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
                denom: chainInfo.currencies[0].coinMinimalDenom,
                amount: amount,
              },
            ],
            "auto",
            btoa(memo)
          );
          console.log("Transaction Response", deliverTxResponse);
          await setTxResponse(deliverTxResponse); // 상태 업데이트

          if (deliverTxResponse.transactionHash) {
            await fetch(`/api/minting`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address: address,
                txhash: deliverTxResponse.transactionHash,
              }),
            })
              // .then(response => response.json())
              // .then(data => console.log(data))
              .catch((error) => console.error("Error:", error));
          }
        } catch (e) {
          console.warn("Error sending tokens", e);
          setTxResponse(null); // 에러가 발생하면 상태를 null로 설정
        }
      };

      var recipientAddress = accounts[0].address;
      var amount = "1"; // 보낼 토큰의 양
      var memo = '{"p":"finrc-20","op":"mint","tick":"PDTX","amt":"1"}'; // 메모

      sendTokensTo(recipientAddress, amount, memo);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="w-full text-white text-center text-2xl whitespace-nowrap grow justify-center items-stretch bg-red-600 border px-12 py-3.5 rounded-[32px] max-md:px-5 max-sm:items-center max-sm:max-w-[154px] max-sm:mx-auto"
        onClick={minting}
      >
        Disagree
      </button>
    </div>
  );
};

export default Minting;
