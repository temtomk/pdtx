import * as React from "react";
import WalletConnect from "./components/wallet/wallet-connect";
import { WalletProvider } from "./components/wallet/wallet";
import Pdtx from "../public/pdtx.svg";
import Total from "./components/get-total";
import Container from "./components/button-container/page";
import Main from "./components/main";
import Blocks from "./components/blocks";
// import ProfileTotal from "./component/profile-total";

export default function Component() {
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

        <Blocks />

        <div className="justify-center items-center self-stretch bg-white bg-opacity-40 flex w-full flex-col mt-12 mb-20 px-16 py-12 max-md:max-w-full max-md:my-10 max-md:px-5">
          <div className="flex max-w-full flex-col items-center">
            <div className="text-white text-center md:text-2xl tracking-2xl whitespace-nowrap">
              1 Disagree = 1 $PDTX
            </div>
            <Main />
            <Container />
          </div>
        </div>

        <div className="text-center text-white mt-1 mb-5">
          Copyrightsⓒ 2024 All rights reserved by TEAM REVENGERS
        </div>
      </div>
    </WalletProvider>
  );
}
