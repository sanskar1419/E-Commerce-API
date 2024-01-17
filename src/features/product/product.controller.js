import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProduct(req, res) {
    const products = ProductModel.GetAll();
    res.status(200).send(products);
  }
  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }
  getOneProduct(req, res) {
    const { id } = req.params;
    console.log(id);
    const product = ProductModel.getProductById(id);
    if (!product) {
      res.status(404).send("Product Not Found");
    } else {
      res.status(200).send(product);
    }
  }
  rateProduct(req, res) {
    const { userId, productId, rating } = req.query;
    try {
      ProductModel.rateProduct(userId, productId, rating);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.status(200).send("Rating has been recorded");
  }
  filterProducts(req, res) {
    console.log(req.query);
    const { minPrice, maxPrice, Category } = req.query;
    const result = ProductModel.filter(+minPrice, +maxPrice, Category);
    res.status(200).send(result);
  }
}
