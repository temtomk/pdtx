import * as React from "react";
import WalletConnect from "./wallet-connect";
import Minting from "./mint";
import Profile from "./profile";
import { WalletProvider } from "./wallet";

export default function Component(props) {
  return (
    <WalletProvider>
      <div className="bg-zinc-800 flex flex-col py-11">
        <WalletConnect />
        <div className="text-white text-center text-7xl tracking-[7px] self-center whitespace-nowrap mt-52 max-md:text-4xl max-md:mt-10">
          $GODFinscia
        </div>
        <div className="text-white text-center text-xl tracking-wide max-w-[363px] self-center mt-12 max-md:mt-10">
          Total Supply 21,000,000
          <br />
          No roadmap No utility No owner
          <br />
          Just meme, enjoy!
        </div>
        <div className="justify-center items-center self-stretch bg-white bg-opacity-40 flex w-full flex-col mt-12 mb-40 px-16 py-12 max-md:max-w-full max-md:my-10 max-md:px-5">
          <div className="flex w-[620px] max-w-full flex-col items-center">
            <div className="text-white text-center text-4xl tracking-[2.8px] whitespace-nowrap">
              1MINT = 1$GODF
            </div>
            <div className="items-stretch self-stretch flex justify-between gap-5 mt-14 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-sm:flex max-sm:flex-row max-sm:self-stretch max-sm:items-center max-sm:justify-between max-sm:w-auto max-sm:h-auto max-sm:grow-0">
              <Minting />
              <Profile />
              <div className="text-white text-center text-2xl tracking-[2.88px] whitespace-nowrap grow justify-center items-stretch bg-sky-600 px-10 py-3.5 rounded-[32px] max-md:px-5 max-sm:items-center max-sm:max-w-[154px] max-sm:mx-auto">
                Twitter
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}


