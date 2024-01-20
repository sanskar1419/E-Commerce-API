import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProduct(req, res) {
    try {
      const products = await this.productRepository.getAll();
      // console.log(products);
      return res.status(200).send(products);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        parseFloat(price),
        sizes.split(","),
        req.file.filename
      );
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (error) {
      console.log(error);
      res.status(400).send("Unable to add product");
    }
  }

  async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const product = await this.productRepository.getProductById(id);
      if (!product) {
        res.status(404).send("Product Not Found");
      } else {
        res.status(200).send(product);
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async rateProduct(req, res, next) {
    try {
      const { productId, rating } = req.query;
      const userId = req.userId;
      await this.productRepository.rate(userId, productId, rating);
      return res.status(200).send("Rating has been recorded");
    } catch (error) {
      console.log(err);
      next(err);
    }
  }
  async filterProducts(req, res) {
    try {
      const { minPrice, maxPrice, Category } = req.query;
      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        Category
      );
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
