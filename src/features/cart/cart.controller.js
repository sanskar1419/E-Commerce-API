import { ApplicationError } from "../../error-handler/applicationError.js";
import CartItemModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";
import { ObjectId } from "mongodb";

export class CartItemsController {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userId;
      const newItem = new CartItemModel(
        new ObjectId(productID),
        new ObjectId(userID),
        quantity
      );

      await this.cartRepository.add(newItem);
      res.status(201).send("Cart is updated");
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async get(req, res) {
    try {
      const userID = req.userId;
      const items = await this.cartRepository.get(userID);
      return res.status(200).send(items);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async delete(req, res) {
    try {
      const userID = req.userId;
      const cartItemID = req.params.id;
      const isDeleted = await this.cartRepository.delete(cartItemID, userID);
      if (!isDeleted) {
        return res.status(404).send("No item found");
      }
      return res.status(200).send("Cart Item is removed");
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
