import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/file.upload.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", productController.getAllProduct);
productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/:id", productController.getOneProduct);
productRouter.post("/rate", productController.rateProduct);
productRouter.get("/product/filter", productController.filterProducts);

export default productRouter;
