"use client";

import React, { useState, useEffect } from "react";
import { WalletContext } from "./wallet";

const Total = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalBalance = async () => {
      try {
        const response = await fetch(`/api/minting/get-total/`);
        const data = await response.json();
        setTotal(data[0].totalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getTotalBalance();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-5 text-2xl">
      현재까지 모인 $PDTX: {total.toLocaleString()} / 7,517,509
    </div>
  );
};

export default Total;
