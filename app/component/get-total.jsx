"use client";

import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Total() {
  const { data, error } = useSWR(
    // `https://disagree-pdt.vercel.app/api/minting/get-total`,
    "/api/minting/get-total",
    fetcher
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center mt-5 text-2xl text-white">
        데이터 로딩 중...
      </div>
    );
  }

  const total = data[0]?.totalToken;

  return (
    <div className="flex flex-col justify-center items-center mt-5 text-2xl text-white">
      <p>
        현재까지 채굴된 $PDTX: {total ? total.toLocaleString() : 0} / 7,517,509
      </p>
    </div>
  );
}

export default Total;
