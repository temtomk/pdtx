import { MongoClient } from 'mongodb';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  let client;
    try {
      const {address, txhash} = await req.json();
      // console.log("address: ", address, "txhash: ", txhash);
      
      const url = process.env.MONGODB_URI;
    
      client = await new MongoClient(url).connect();
      const db = client.db('godfinshia');
      const collection = db.collection('tests');
      
      const result = await collection.findOneAndUpdate(
        { Address: address },
        {
          $inc: { Token: 1000 },
          $push: { Txhash: txhash }
        },
        { upsert: true }
      );
      
      // console.log(result);
      
      return NextResponse.json(result); // 응답 반환
    } catch (err) {
      return NextResponse.json({ message: err.message });
    } finally {
      if (client) {
        await client.close();
      }
    }
}
