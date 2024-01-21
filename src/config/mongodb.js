import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB Is Connected");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDatabase = () => {
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    console.log("Indexes are Created");
  } catch (error) {
    console.log(error);
  }
};
