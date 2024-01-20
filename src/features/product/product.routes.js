import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/file.upload.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", (req, res) => {
  productController.getAllProduct(req, res);
});
productRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.post("/rate", (req, res, next) => {
  productController.rateProduct(req, res, next);
});
productRouter.get("/product/filter", (req, res) => {
  productController.filterProducts(req, res);
});

export default productRouter;
