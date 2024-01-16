// dbConnect.js

import { MongoClient } from "mongodb";

let cachedDb = null;
// let collection = "mints";
let collection = "tests";

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI;

  const client = await MongoClient.connect(uri);

  if (process.env.NODE_ENV === "development") {
    collection = "tests";
  }

  const db = await client.db("godfinshia");

  const connectedCollection = await db.collection(collection);

  cachedDb = connectedCollection;

  return connectedCollection;
}

export default connectToDatabase;
