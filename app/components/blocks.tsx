"use client";

import { useState, useEffect } from "react";

export default function Blocks() {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [indexerBlock, setIndexerBlock] = useState(0);

  useEffect(() => {
    async function getIndexerBlock() {
      const res = await fetch(
        "https://f8c2-211-184-43-102.ngrok-free.app/api/IndexerBlock",
        {
          cache: "no-store",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const data = await res.json();

      setIndexerBlock(data.currentBlockHeight);
    }

    async function getCurrentBlock() {
      const res = await fetch("https://finschia-rpc.finschia.io/abci_info?", {
        cache: "no-store",
      });

      const data = await res.json();

      setCurrentBlock(data.result.response.last_block_height);
    }

    getIndexerBlock();
    getCurrentBlock();
  }, []);

  return (
    <div className="flex justify-center margin-right mt-5 text-xl">
      (Indexer Block: {indexerBlock}, Current Block: {currentBlock})
    </div>
  );
}
