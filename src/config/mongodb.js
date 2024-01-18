import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((client) => {
      console.log("MongoDB Is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToMongoDB;
