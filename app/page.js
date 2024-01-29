import * as React from "react";
import WalletConnect from "./components/wallet/wallet-connect";
import { WalletProvider } from "./components/wallet/wallet";
import Pdtx from "../public/pdtx.svg";
import Total from "./components/total";
import Main from "./components/main";
import Blocks from "./components/blocks";
import { Disagree } from "./components/disagree";
// import ProfileTotal from "./component/profile-total";

export default function Component() {
  return (
    <WalletProvider>
      <div className="bg-zinc-800 flex flex-col">
        {/* <WalletConnect /> */}
        <div className="flex items-center justify-center text-white text-center text-2xl sm:text-6xl tracking-[7px] mt-20">
          <Pdtx width="1em" height="1em" />
          <span className="font-bold ml-1">$PDTX (NO PDT)</span>
        </div>
        <div className="flex flex-col text-white text-center sm:text-xl tracking-wide mt-12">
          핀시아 X 클레이튼 합병을 반대합니다!
          <br />
          누구를 위한 합병인가, 전면백지화 혹은 비율 재산정하라!
          <br />
          <br />
          <Disagree />
          <br />
          <div className="flex flex-col font-bold ">
            기본지식 1) 2/2 투표종료시 거버넌스 투표 스냅샷 입니다.
            <br />
            <div className="flex flex-col">
              기본지식 2) 강력반대 33.34% 이상, 혹은 반대 50.01% 이상일 시
              부결입니다.
            </div>
            <br />
            <br />
          </div>
          현재 강력반대를 위해 거버넌스 투표 스냅샷 전까지{" "}
          <span className="text-yellow-300 font-bold">버그홀 </span>
          또는 <span className="text-yellow-300 font-bold">A41 </span>에
          투표권을 위임해야 합니다.
          <br />
          <br />
          <div className="flex text-center items-center justify-center">
            1차 합병 제안 부결 시 $PDTX 홀더들 대상으로 치킨 3마리 에어드랍
            하겠습니다.
          </div>
          <br />
          <div className="flex flex-col font-bold">[$PDTX 채굴하는 방법]</div>
          자기 자신에게 FNSA를 송금하여 MEMO 란에
          <br />
          <div className="flex flex-col font-bold text-yellow-300 text-wrap break-all">
            eyJwIjogImZpbnJjLTIwIiwib3AiOiAibWludCIsInRpY2siOiAiUERUWCIsImFtdCI6ICIxIn0=
          </div>
          라고 입력 후 전송하시면 1$PDTX 채굴 완료!
          <br />
        </div>

        <Total />

        <Blocks />

        <div className="justify-center items-center self-stretch bg-white bg-opacity-40 flex w-full flex-col mt-12 mb-20 px-16 py-12">
          <div className="flex max-w-full flex-col items-center">
            <div className="text-white text-center text-2xl tracking-2xl">
              1 Disagree = 1 $PDTX
            </div>
            <Main />
          </div>
        </div>

        <div className="flex text-center text-white mt-1 mb-5">
          Copyrightsⓒ 2024 All rights reserved by TEAM REVENGERS
        </div>
      </div>
    </WalletProvider>
  );
}
