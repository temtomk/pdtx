// "use client";

import React from "react";
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());

async function Total() {
  // const { data, error, isLoading } = useSWR(
  //   "https://e49e-211-184-43-102.ngrok-free.app/api/totalAmounts",
  //   fetcher
  // );

  const res = await fetch(
    "https://5141-211-184-43-102.ngrok-free.app/api/totalAmounts"
  );

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col justify-center items-center mt-5 text-2xl text-white">
  //       데이터 로딩 중...
  //     </div>
  //   );
  // }

  const data = await res.json();

  const total = data.totalAmount;

  const percent = ((total / 7517509) * 100).toFixed(3);

  return (
    <div className="flex flex-col justify-center items-center mt-5 text-2xl text-white">
      <p>
        현재까지 채굴된 $PDTX: {total ? total.toLocaleString() : 0} / 7,517,509
        ({percent}%)
      </p>
    </div>
  );
}

export default Total;
