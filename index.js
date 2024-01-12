import express from "express";
import productRouter from "./src/features/product/product.routes.js";
const app = new express();

app.use("/api/product", productRouter);

export default app;
