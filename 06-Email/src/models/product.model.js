const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sellerMail: { type: String, required: true },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
