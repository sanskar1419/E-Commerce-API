import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB Is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDatabase = () => {
  return client.db();
};
