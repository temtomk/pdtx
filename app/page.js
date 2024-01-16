import * as React from "react";
import WalletConnect from "./_component/wallet-connect";
import Minting from "./_component/mint";
import Profile from "./_component/profile";
import { WalletProvider } from "./_component/wallet";
import Pdtx from "../public/pdtx.svg";
import Total from "./_component/get-total";

export default function Component(props) {
  return (
    <WalletProvider>
      <div className="bg-zinc-800 flex flex-col py-11">
        <WalletConnect />
        <div className="flex items-center justify-center text-white text-center text-6xl tracking-[7px] self-center whitespace-nowrap mt-20 max-md:text-4xl max-md:mt-5">
          <Pdtx width="1em" height="1em" />
          <span className="font-bold ml-1">$PDTX (NO PDT)</span>
        </div>
        <div className="text-white text-center text-xl tracking-wide self-center mt-12 max-md:mt-10">
          핀시아 X 클레이튼 합병을 반대합니다!
          <br />
          We are opposed to the Finscia X Klaytn Chain merge.
          <br />
          ピンシアXクレイトン合併に反対！
          <br />
          <br />
          누구를 위한 합병인가, 시가총액 기준으로 비율 재산정하라!
          <br />
          Recalculate based on market capitalization!
          <br />
          時価総額に基づいて比率を計算しましょう！
          <br />
          <br />
          핀시아 X 클레이튼 합병 반대 의사 표명하고
          <br />
          1$PDTX (PDT 반대 코인) 받아가세요
          <br />
          홀더들의 힘을 보여줍시다!
        </div>

        <Total />

        <div className="justify-center items-center self-stretch bg-white bg-opacity-40 flex w-full flex-col mt-12 mb-20 px-16 py-12 max-md:max-w-full max-md:my-10 max-md:px-5">
          <div className="flex w-[620px] max-w-full flex-col items-center">
            <div className="text-white text-center md:text-[2.3vw] tracking-[2.8px] whitespace-nowrap">
              1 Disagree = 1 $PDTX
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-3 flex items-stretch self-stretch justify-between gap-5 mt-14 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-sm:flex max-sm:flex-col max-sm:self-stretch max-sm:items-center max-sm:justify-between max-sm:w-auto max-sm:h-auto max-sm:grow-0">
              <div className="col-span-1 w-full">
                <Minting />
              </div>
              <div className="col-span-1 w-full shrink-0 inline-block">
                <Profile />
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
        <div className="text-center text-white mt-1 mb-5">
          Copyrightsⓒ 2024 All rights reserved by TEAM REVENGERS
        </div>
      </div>
    </WalletProvider>
  );
}
