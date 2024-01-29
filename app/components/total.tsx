"use client";

import React, { useState, useEffect } from "react";

function Total() {
  const [total, setTotal] = useState(0);
  const url = process.env.NEXT_PUBLIC_INDEXER_URL;

  useEffect(() => {
    async function fetchTotal() {
      const response = await fetch(url + "/api/totalAmounts", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await response.json();

      setTotal(data.totalAmount);
    }

    fetchTotal();
  }, []);

  const percent = ((total / 7517509) * 100).toFixed(3);

  return (
    <div className="flex flex-col justify-center items-center mt-5 sm:text-2xl text-white">
      <p>
        현재까지 채굴된 $PDTX: {total ? total.toLocaleString() : 0} / 7,517,509
        ({percent}%)
      </p>
    </div>
  );
}

export default Total;
