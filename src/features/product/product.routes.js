import express from "express";
import ProductController from "./product.controller.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", productController.getAllProduct);
productRouter.post("/", productController.addProduct);
productRouter.get("/:id", productController.getOneProduct);
productRouter.post("/rate", productController.rateProduct);

export default productRouter;
