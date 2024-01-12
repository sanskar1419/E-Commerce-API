import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProduct(req, res) {
    const products = ProductModel.GetAll();
    res.status(201).send(products);
  }
  addProduct(req, res) {}
  getOneProduct(req, res) {}
  rateProduct(req, res) {}
  filterProducts(req, res) {}
}
