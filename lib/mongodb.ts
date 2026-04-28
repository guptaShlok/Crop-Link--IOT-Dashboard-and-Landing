import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://shlokofficial01_db_user:MsZUDXaW2mNdrC9o@cluster0.mztqjqy.mongodb.net/';

if (!MONGODB_URI) {
  throw new Error('Invalid/missing environment variable: "MONGODB_URI"');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('crop-link');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}

export async function getCollection(name: string) {
  const db = await getDatabase();
  return db.collection(name);
}
