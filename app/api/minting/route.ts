import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "../../utils/db-connect";

export async function POST(req: NextRequest) {
  let client;
  try {
    const { address, txhash } = await req.json();
    const db = await connectToDatabase();

    const result = await db.findOneAndUpdate(
      { Address: address },
      {
        $inc: { Token: 1 },
        $push: { Txhash: txhash },
      },
      { upsert: true }
    );

    // console.log(result);

    return NextResponse.json(result); // 응답 반환
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
