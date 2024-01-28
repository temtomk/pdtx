async function getDisagree(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_INDEXER_URL;
  const res = await fetch(url + "/api/Disagree", {
    cache: "no-store",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  const data = await res.json();

  return data.CurrentDisagree;
}

export async function Disagree() {
  const disagree = await getDisagree();
  return (
    <div className="font-bold text-4xl ">
      현재 강한 반대율: <span className="text-yellow-300">{disagree} %</span>
    </div>
  );
}
