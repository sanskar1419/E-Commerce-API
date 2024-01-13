import express from "express";
import productRouter from "./src/features/product/product.routes.js";
// import bodyParser from "body-parser";
const app = new express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use("/api/product", productRouter);

export default app;
