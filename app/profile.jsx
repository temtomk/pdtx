'use client';

import React, { useState, useContext, useEffect } from "react";
import { WalletContext } from "./wallet";
import { getMintingByAddress } from "./db.js";

const Profile = () => {
  const { client, accounts, isConnected } = useContext(WalletContext);
  // 잔액 상태를 추가합니다.
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (isConnected) {
      console.log("Connected with accounts", accounts);
    }
  }, [isConnected, accounts]);

  const getAccountsBalance = async () => {
  //   if (!client || !accounts || accounts.length === 0) {
  //     console.warn("Wallet is not connected or accounts are not available");
  //     return;
  //   }
  //   try {
  //     const address = accounts[0].address;
  //     let balanceResult = await client.getBalance(
  //       address,
  //       ChainInfo.currencies[0].coinMinimalDenom
  //     );
  //     // balance.amount는 문자열이므로 숫자로 변환합니다.
  //     let amount = balanceResult.amount;
  //     // 문자열로부터 숫자로 변환하고 0.000001을 곱합니다.
  //     let calculatedBalance = (Number(amount) * 0.000001).toFixed(6);
  //     console.log(`Account balance: ${calculatedBalance}`);
  //     // 상태를 업데이트합니다.
  //     setBalance(calculatedBalance);
  //   } catch (e) {
  //     console.error("Error reading account balance", e);
  //   }
    const userBalance = await getMintingByAddress(accounts[0].address);
    setBalance(userBalance);
  };

  return (
    <>
      <button
        className="text-white text-center text-2xl tracking-[2.88px] whitespace-nowrap grow justify-center items-stretch bg-zinc-600 px-11 py-3.5 rounded-[32px] max-md:px-5 max-sm:max-w-[154px] max-sm:mx-auto"
        onClick={getAccountsBalance}
      >
        Profile
      </button>
      {/* 잔액을 화면에 표시합니다. */}
      {balance && <p>Balance: {balance}</p>}
    </>
  );
};

export default Profile;
