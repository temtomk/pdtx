"use client";

import React, { useState, useContext } from "react";
import { WalletContext } from "./wallet";
import Minting from "./minting";
import Profile from "./profile";

const Container = () => {
  const { client, accounts } = useContext(WalletContext);
  const [isConnected, setIsConnected] = useState(true);

  const checkConnection = () => {
    setIsConnected(!!(client && accounts));
  };

  return (
    <div className="justify-center items-center self-stretch bg-white bg-opacity-40 flex w-full flex-col mt-12 mb-20 px-16 py-12 max-md:max-w-full max-md:my-10 max-md:px-5">
      <div className="flex w-[620px] max-w-full flex-col items-center">
        <div className="text-white text-center md:text-[2.3vw] tracking-[2.8px] whitespace-nowrap">
          1 Disagree = 1 $PDTX
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-3 flex items-stretch self-stretch justify-between gap-5 mt-14 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-sm:flex max-sm:flex-col max-sm:self-stretch max-sm:items-center max-sm:justify-between max-sm:w-auto max-sm:h-auto max-sm:grow-0">
          <div className="col-span-1 w-full">
            <Minting onButtonClick={checkConnection} />
          </div>
          <div className="col-span-1 w-full shrink-0 inline-block">
            <Profile
              isConnected={isConnected}
              onButtonClick={checkConnection}
            />
          </div>
          <div className="col-span-1 w-full flex-col justify-center items-center">
            <div>
              <div className="w-full text-white text-center text-2xl tracking-[2.88px] border whitespace-nowrap grow justify-center items-stretch bg-sky-600 px-10 py-3.5 rounded-[32px] max-md:px-5 max-sm:items-center max-sm:max-w-[154px] max-sm:mx-auto">
                <a
                  href="https://twitter.com/TEAM_REVENGERS_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
