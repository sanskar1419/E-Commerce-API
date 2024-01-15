import CartItemModel from "./cart.model.js";

export class CartItemsController {
  add(req, res) {
    const { productID, quantity } = req.query;
    const userID = req.userId;
    CartItemModel.add(productID, userID, quantity);
    res.status(201).send("Cart is updated");
  }

  get(req, res) {
    const userID = req.userId;
    const items = CartItemModel.get(userID);
    return res.status(200).send(items);
  }

  delete(req, res) {
    const userID = req.userId;
    const cartItemID = req.params.id;
    const error = CartItemModel.delete(cartItemID, userID);
    if (error) {
      return res.status(404).send(error);
    }
    return res.status(200).send("Cart Item is removed");
  }
}