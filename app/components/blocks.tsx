async function getIndexerBlock(): Promise<number> {
  const res = await fetch(
    "https://5141-211-184-43-102.ngrok-free.app/api/IndexerBlock"
  );

  const data = await res.json();

  return data.currentBlockHeight;
}

async function getCurrentBlock(): Promise<number> {
  const res = await fetch("https://finschia-rpc.finschia.io/abci_info?");

  const data = await res.json();

  return data.result.response.last_block_height;
}

export default async function Blocks() {
  const indexerBlock = await getIndexerBlock();
  const currentBlock = await getCurrentBlock();
  return (
    <div className="flex justify-center margin-right mt-5 text-xl">
      (Indexer Block: {indexerBlock}, Current Block: {currentBlock})
    </div>
  );
}
