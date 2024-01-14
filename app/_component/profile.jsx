"use client";

import React, { useState, useContext } from "react";
import { WalletContext } from "./wallet";

const Profile = () => {
  const { accounts } = useContext(WalletContext);
  // 잔액 상태를 추가합니다.
  const [balance, setBalance] = useState(null);

  const getAccountsBalance = async () => {
    await fetch(`/api/minting/${accounts[0].address}`)
      .then((response) => response.json())
      .then((data) => {
        setBalance(data.Token);
        // console.log(data)
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <button
          className="text-white text-center text-2xl tracking-[2.88px] whitespace-nowrap grow justify-center items-stretch bg-zinc-600 px-11 py-3.5 rounded-[32px] max-md:px-5 max-sm:max-w-[154px] max-sm:mx-auto"
          onClick={getAccountsBalance}
        >
          Profile
        </button>
      </div>
      {/* 잔액을 화면에 표시합니다. */}
      {balance && (
        <div>
          <p>Balance: {balance}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
