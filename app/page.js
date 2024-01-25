import * as React from "react";
import WalletConnect from "./components/wallet/wallet-connect";
import { WalletProvider } from "./components/wallet/wallet";
import Pdtx from "../public/pdtx.svg";
import Total from "./components/total";
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
          누구를 위한 합병인가, 전면백지화 혹은 비율 재산정하라!
          <br />
          <br />
          현재 반대표 던지려면 유효한 방법은 두개 입니다.
          <br />
          <br />
          1) 굳갱 물량 재위임: 굳갱에 예치한 물량 재위임을 통해 네오핀 혹은
          버그홀로 재위임 해주세요.
          <br />
          2) 거래소 물량 네오핀 자체지갑으로 이동 및 예치: 네오핀 자체 지갑으로
          거래소 물량을 이동하여 예치 및 직접 투표해주세요.
          <br />
          <br />
          위 내용과 별개로 합병 반대운동 진행 중입니다.
          <br />
          <br />
          자기 자신에게 FNSA를 송금하여 MEMO 란에
          <br />
          <p className="font-bold text-yellow-300">
            eyJwljogImZpbnJjLT|wliwib3AiOiAibWludCIsInRpY2siOiAiUERUWClsImFtdCI6ICIxIn0=
          </p>
          라고 입력 후 전송하시면 1$PDTX 채굴 완료!
          <br />
          <br />
          합병백지화 혹은 비율 재산정 시 $PDTX 홀더들 대상으로 치킨 에어드랍
          하겠습니다.
        </div>

        <Total />

        <Blocks />

        <div className="justify-center items-center self-stretch bg-white bg-opacity-40 flex w-full flex-col mt-12 mb-20 px-16 py-12 max-md:max-w-full max-md:my-10 max-md:px-5">
          <div className="flex max-w-full flex-col items-center">
            <div className="text-white text-center md:text-2xl tracking-2xl whitespace-nowrap">
              1 Disagree = 1 $PDTX
            </div>
            <Main />
          </div>
        </div>

        <div className="text-center text-white mt-1 mb-5">
          Copyrightsⓒ 2024 All rights reserved by TEAM REVENGERS
        </div>
      </div>
    </WalletProvider>
  );
}
