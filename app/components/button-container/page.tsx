"use client";

import React, { useState, useContext } from "react";
import { WalletContext } from "../wallet/wallet";
import Minting from "./minting";
import Profile from "./profile";
import Twitter from "./twitter";
import About from "./about";

const Container = ({ checkConnection, setBalance, setShowBalance }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 xl:grid-cols-4 flex items-stretch self-stretch justify-between gap-5 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-sm:flex max-sm:flex-col max-sm:self-stretch max-sm:items-center max-sm:justify-between max-sm:w-auto max-sm:h-auto max-sm:grow-0">
      <div className="col-span-1 w-full">
        <Minting onButtonClick={checkConnection} />
      </div>
      <div className="col-span-1 w-full shrink-0 inline-block">
        <Profile
          onButtonClick={checkConnection}
          setBalance={setBalance}
          setShowBalance={setShowBalance}
        />
      </div>
      <div className="col-span-1 w-full flex-col justify-center items-center">
        <Twitter />
      </div>
      <div className="col-span-1 w-full flex-col justify-center items-center">
        <About />
      </div>
    </div>
  );
};

export default Container;
