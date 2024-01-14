"use client";

// WalletContext.js
import React, { createContext, useState, useEffect } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { chainInfo } from "../data/chain-info";
import { Decimal } from "@cosmjs/math";

export const WalletContext = createContext({
  client: null,
  accounts: null,
  isConnected: false,
  connectWallet: () => {},
});

export const WalletProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.keplr) {
      try {
        await window.keplr.experimentalSuggestChain(chainInfo);
        await window.keplr.enable(chainInfo.chainId);
        const offlineSigner = await window.getOfflineSignerAuto(
          chainInfo.chainId
        );

        const accounts = await offlineSigner.getAccounts();
        const client = await SigningCosmWasmClient.connectWithSigner(
          chainInfo.rpc,
          offlineSigner,
          {
            gasPrice: {
              amount: Decimal.fromAtomics("1000", 4),
              denom: chainInfo.currencies[0].coinMinimalDenom,
            },
          } // gasfee 설정을 위한 option이 추가됨.
        );

        const queryHandler = client.queryClient.wasm.queryContractSmart;
        // Gas price
        const gasPrice = GasPrice.fromString("0.002tcony");

        console.log("Wallet connected", {
          offlineSigner: offlineSigner,
          CosmWasmClient: client,
          accounts: accounts,
          chain: chainInfo,
          queryHandler: queryHandler,
          gasPrice: gasPrice,
        });

        setAccounts(accounts);
        setClient(client);
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect with Keplr:", error);
        setIsConnected(false);
      }
    } else {
      console.warn("Please install Keplr extension.");
      setIsConnected(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{ client, accounts, isConnected, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
