import { getDatabase } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
  async signUp(newUser) {
    try {
      const database = getDatabase();
      const collection = database.collection("users");
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async findByEmail(email) {
    try {
      const database = getDatabase();
      const collection = database.collection("users");
      return await collection.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default UserRepository;
