import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, { params: { address } }) {
  let client;
    try {
      const url = process.env.MONGODB_URI;
    
      client = await new MongoClient(url).connect();
      const db = client.db('godfinshia');
      const collection = db.collection('tests');
      
      const result = await collection.findOne({ Address: address })
      
      console.log(result);
      
      return NextResponse.json(result); // 응답 반환
    } catch (err) {
      return NextResponse.json({ message: err.message });
    } finally {
      if (client) {
        await client.close();
      }
    }
}