import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utils/db-connect";

export async function POST(req) {
  try {
    let collection = "mints";
    let database = "godfinshia";
    if (process.env.NODE_ENV == "development") {
      collection = "tests";
    }

    const db = (await connectDB).db(database).collection(collection);
    const tx = await req.json();
    // const db = await connectToDatabase();

    const result = await db.findOneAndUpdate(
      { Address: tx.address },
      {
        $inc: { Token: 1 },
        $push: { Txhash: tx.txhash, Height: tx.height },
      },
      { upsert: true }
    );

    return NextResponse.json(result); // 응답 반환
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
