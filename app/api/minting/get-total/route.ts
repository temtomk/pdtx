import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/db-connect";

export async function GET() {
  try {
    const db = await connectToDatabase();

    const result = await db
      .aggregate([
        {
          $group: {
            _id: null, // 특정 그룹으로 묶지 없고 전체 document에 대해 연산을 하기 위해 null을 지정합니다.
            totalToken: { $sum: "$Token" }, // "Token" 필드의 값들을 모두 더합니다.
          },
        },
      ])
      .toArray();

    console.log(result);

    return NextResponse.json(result); // 응답 반환
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
