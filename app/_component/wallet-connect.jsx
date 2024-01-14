"use client";

import { WalletContext } from "./wallet";
import { useContext } from "react";

export default function WalletConnect() {
  const { isConnected, connectWallet } = useContext(WalletContext);

  return (
    <div className="flex justify-end margin-right">
      <button
        className="text-white text-center text-sm sm:text-base md:text-[2vw] whitespace-nowrap justify-center items-stretch mr-2 sm:mr-11 h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 px-2 sm:px-8 py-1 sm:py-4 rounded-lg border-2 border-solid border-white self-end max-sm:mr-2.5 max-sm:px-5"
        onClick={connectWallet}
      >
        {isConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
}
