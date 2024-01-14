"use client";

import { WalletContext } from "./wallet";
import { useContext } from "react";

export default function WalletConnect() {
  const { isConnected, connectWallet } = useContext(WalletContext);

  return (
    <div className="flex justify-end margin-right">
      <button
        className="text-white text-center text-sm sm:text-base md:text-[2vw] whitespace-nowrap justify-center items-stretch mr-2 sm:mr-11 h-8 sm:h-10 md:h-12 lg:h-14 xl:h-18 px-1 sm:px-6 py-1 sm:py-3 rounded-lg border-2 border-solid border-white self-end max-sm:mr-2.5 max-sm:px-4"
        onClick={connectWallet}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
