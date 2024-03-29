"use client";

import { useContext, useState } from "react";
import { WalletContext } from "./wallet/wallet";
import Search from "./search";
import Container from "./button-container/container";

export default function Main() {
  const { client, accounts } = useContext(WalletContext);
  const [isConnected, setIsConnected] = useState(true);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false); // 잔액 출력 상태 추가
  const [searchResult, setSearchResult] = useState(null);

  const checkConnection = () => {
    setIsConnected(!!(client && accounts));
  };

  return (
    <div>
      <Search setSearchResult={setSearchResult} />

      <Container
        checkConnection={checkConnection}
        setBalance={setBalance}
        setShowBalance={setShowBalance}
      />
      {!isConnected && (
        <div className="flex w-full justify-center items-center mt-5 text-2xl">
          <p>No connected</p>
        </div>
      )}
      {showBalance && isConnected && (
        // showBalance 상태가 true인 경우에만 잔액을 표시
        <div className="flex w-full justify-center items-center mt-5 text-2xl">
          <p>Balance: {balance}</p>
        </div>
      )}

      {searchResult === undefined && (
        <div className="flex w-full justify-center items-center mt-5 text-2xl">
          The account does not exist.
        </div>
      )}
      {searchResult && (
        <div className="flex w-full justify-center items-center mt-5 text-2xl">
          <p>{`Balance: ${searchResult}`}</p>
        </div> // balance는 실제 데이터에 맞게 수정해야 합니다.
      )}
    </div>
  );
}
