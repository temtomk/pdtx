"use client";

import { WalletContext } from "./wallet";
import { useContext } from "react";

export default function WalletConnect() {
  const { isConnected, connectWallet } = useContext(WalletContext);

  return (
    <div className="absolute top-0 right-0 mt-8 mr-4">
      <button
        className="text-white text-center text-base whitespace-nowrap justify-center items-stretch mr-11 px-8 py-4 rounded-lg border-2 border-solid border-white self-end max-md:mr-2.5 max-md:px-5"
        onClick={connectWallet}
      >
        {isConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
}
