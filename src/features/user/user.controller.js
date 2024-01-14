import UserModel from "./user.model.js";

export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    if (!newUser) {
      res.status(404).send("Enable to register !!!!!");
    } else {
      res.status(200).send(newUser);
    }
  }
  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (!user) {
      res.status(400).send("Invailid Credentials");
    } else {
      res.status(201).send("Login Successful");
    }
  }
}
