import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";

const app = new express();

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

export default app;
