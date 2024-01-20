export default class CartItemModel {
  constructor(productID, userID, quantity, id) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this._id = id;
  }
}
var cartItems = [new CartItemModel(1, 2, 1, 1), new CartItemModel(3, 1, 4, 2)];
