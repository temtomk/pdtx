import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/db-connect";

export async function GET(req, { params: { address } }) {
  try {
    const db = await connectToDatabase();

    const result = await db.findOne({ Address: address });

    console.log(result);

    return NextResponse.json(result); // 응답 반환
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
