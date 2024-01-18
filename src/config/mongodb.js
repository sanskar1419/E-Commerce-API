import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
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
