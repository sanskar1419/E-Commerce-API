import { getDatabase } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

class CartRepository {
  constructor() {
    this.db_collection = "cart";
  }

  async add(newItem) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      await collection.insertOne(newItem);
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong With the data base",
        500
      );
    }
  }
  async get(userId) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      const items = await collection
        .find({ userID: new ObjectId(userId) })
        .toArray();
      return items;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong With the data base",
        500
      );
    }
  }

  async delete(cartItemID, userID) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      const result = await collection.deleteOne({
        userID: new ObjectId(userID),
        _id: new ObjectId(cartItemID),
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong With the data base",
        500
      );
    }
  }
}

export default CartRepository;
