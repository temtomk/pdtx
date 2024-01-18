import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db-connect";

export const revalidate = 0;

export async function GET() {
  let collection = "mints";
  let database = "godfinshia";
  try {
    if (process.env.NODE_ENV == "development") {
      collection = "tests";
    }

    const db = (await connectDB).db(database).collection(collection);

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

    const res = NextResponse.json(result);

    return res;
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
