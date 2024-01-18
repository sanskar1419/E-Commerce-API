import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const newUser = await UserModel.signUp(name, email, password, type);
      if (!newUser) {
        res.status(404).send("Enable to register !!!!!");
      } else {
        res.status(200).send(newUser);
      }
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
  signIn(req, res) {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
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
  }
}
