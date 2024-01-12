import express from "express";
import ProductController from "./product.controller.js";

const router = express.Router();

const productController = new ProductController();

router.get("/", productController.getAllProduct);
router.post("/", productController.addProduct);
router.get("/:id", productController.getOneProduct);
router.post("/rate", productController.rateProduct);

export default router;
