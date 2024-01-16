import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/db-connect";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const result = await db
      .aggregate([
        {
          $group: {
            _id: null,
            totalToken: { $sum: "$Token" },
          },
        },
      ])
      .toArray();

    console.log(result);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
