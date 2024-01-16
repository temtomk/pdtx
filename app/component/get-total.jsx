"use client";

import React, { useEffect, useState } from "react";

const Total = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const response = await fetch(`/api/minting/get-total/`);
        const data = await response.json();
        setTotal(data[0]?.totalToken || 0);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getTotal();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-5 text-2xl text-white">
      현재까지 채굴된 $PDTX:{" "}
      {total ? total.toLocaleString() : "데이터 로딩 중..."} / 7,517,509
    </div>
  );
};

export default Total;
