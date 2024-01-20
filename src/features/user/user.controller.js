import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel(name, email, hashPassword, type);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("Invailid Credentials");
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).send(token);
        } else {
          return res.status(400).send("Invailid Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
