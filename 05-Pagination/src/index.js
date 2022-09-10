const express = require("express");
const app = express();

const productsController = require("./controllers/product.controllers");

app.use("/products", productsController);

module.exports = app;
