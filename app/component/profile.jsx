"use client";

import React, { useState, useContext } from "react";
import { WalletContext } from "./wallet";

const Profile = ({ onButtonClick, setBalance, setShowBalance }) => {
  const { accounts } = useContext(WalletContext);

  const getAccountsBalance = async () => {
    onButtonClick();
    setShowBalance(true);
    if (accounts) {
      await fetch(`/api/minting/${accounts[0].address}`)
        .then((response) => response.json())
        .then((data) => {
          setBalance(data.Token);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <button
          className="flex w-full text-white text-center text-2xl tracking-[2.88px] whitespace-nowrap grow border justify-center items-stretch bg-zinc-600 px-11 py-3.5 rounded-[32px] max-md:px-5 max-sm:max-w-[154px] max-sm:mx-auto"
          onClick={getAccountsBalance}
        >
          Profile
        </button>
      </div>
    </>
  );
};

export default Profile;
