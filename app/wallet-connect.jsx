'use client';

import { useState, useEffect, useContext } from 'react';
import { WalletContext } from './wallet';

export default function WalletConnect() {
  const {client, accounts, isConnected} = useContext(WalletContext);
  const [accountName, setAccountName] = useState("지갑 연결");

  useEffect(() => {
    if (isConnected) {
      setAccountName('연결 완료');
    }
  }, [isConnected, accounts]);

  return (
      <div className="absolute top-0 right-0 mt-8 mr-4">
        <button
          className="text-white text-center text-base whitespace-nowrap justify-center items-stretch mr-11 px-8 py-4 rounded-lg border-2 border-solid border-white self-end max-md:mr-2.5 max-md:px-5"
        >
          {accountName}
        </button>
      </div>
  )
}
