import express from "express";

const app = new express();

app.get("/", (req, res) => {
  res.send("Welcome to E-Commerce Application");
});

export default app;
