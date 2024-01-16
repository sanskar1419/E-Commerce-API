import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth1.middleware.js";
import authorizer from "./src/middlewares/basicAuth2.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };

const app = new express();

// CORS policy configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  // return ok for preflight request.
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// app.use("/api/products", basicAuthorizer, productRouter);
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cartItems", jwtAuth, cartRouter);
app.use("/api/users", userRouter);
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at http://127.0.0.1:9000/api-docs/"
    );
});

export default app;
