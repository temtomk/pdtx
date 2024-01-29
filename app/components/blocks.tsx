"use client";

import { useState, useEffect } from "react";

export default function Blocks() {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [indexerBlock, setIndexerBlock] = useState(0);

  const url = process.env.NEXT_PUBLIC_INDEXER_URL;

  useEffect(() => {
    async function getIndexerBlock() {
      const res = await fetch(url + "/api/IndexerBlock", {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

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
    <div className="flex flex-col text-center mt-5 whitespace-pre sm:text-xl">
      Indexer Block: {indexerBlock}
      <br />
      Current Block: {currentBlock}
    </div>
  );
}
