const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/product.model");

app.use(express.json());

const dotenvFilePath = `.env.${process.env.NODE_ENV}`;
require("dotenv").config({
  path: dotenvFilePath,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Failed to connected", error);
  });

app.get("/", (req, res) => {
  res.send("Hello MongoDB from Node JS");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
