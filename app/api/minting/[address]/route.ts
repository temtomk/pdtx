import { NextResponse } from "next/server";
// import connectToDatabase from "../../../utils/db-connect";
import { connectDB } from "../../../utils/db-connect";

export async function GET(req, { params: { address } }) {
  try {
    // const db = await connectToDatabase();
    let collection = "mints";
    let database = "godfinshia";
    if (process.env.NODE_ENV == "development") {
      collection = "tests";
    }

    const db = (await connectDB).db(database).collection(collection);

    const result = await db.findOne({ Address: address });

    console.log(result);

    return NextResponse.json(result); // 응답 반환
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
