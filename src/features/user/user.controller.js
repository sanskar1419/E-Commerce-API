import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const newUser = new UserModel(name, email, password, type);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.signIn(email, password);
      if (!user) {
        res.status(400).send("Invailid Credentials");
      } else {
        const token = jwt.sign(
          {
            userId: user.ID,
            email: user.email,
          },
          "gH8gK1MHLfh4VPwK2zt0HvnIYYzX8hnU",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).send(token);
      }
    } catch (error) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
