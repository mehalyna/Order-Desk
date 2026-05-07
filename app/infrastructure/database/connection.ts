import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

let client: MongoClient | null = null;
let db: Db | null = null;
let mongoServer: MongoMemoryServer | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  // Use in-memory MongoDB for this training environment
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }

  const uri = mongoServer.getUri();
  client = new MongoClient(uri);
  await client.connect();

  db = client.db("order-desk");

  return db;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
}
