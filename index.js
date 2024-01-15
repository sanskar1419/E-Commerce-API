import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth1.middleware.js";
import authorizer from "./src/middlewares/basicAuth2.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

const app = new express();

app.use(express.json());

// app.use("/api/products", basicAuthorizer, productRouter);
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cartItems", jwtAuth, cartRouter);
app.use("/api/users", userRouter);

export default app;
