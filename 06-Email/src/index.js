const express = require("express");
const app = express();

app.use(express.json());

const productsController = require("./controllers/product.controllers");

app.use("/products", productsController);

module.exports = app;
