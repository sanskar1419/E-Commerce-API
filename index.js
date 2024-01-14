import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth1.middleware.js";

const app = new express();

app.use(express.json());

app.use("/api/products", basicAuthorizer, productRouter);
app.use("/api/users", userRouter);

export default app;
