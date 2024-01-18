import { getDatabase } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  static async signUp(name, email, password, type) {
    try {
      // 1. Get DB
      const database = getDatabase();
      // 2. Get the collection in db
      const collection = database.collection("users");
      const newUser = new UserModel(name, email, password, type);
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    ID: 1,
    name: "Seller User",
    email: "seller@gmail.com",
    password: "Seller123@",
    type: "seller",
  },
  {
    ID: 2,
    name: "Customer User",
    email: "customer@gmail.com",
    password: "customer@",
    type: "customer",
  },
];
