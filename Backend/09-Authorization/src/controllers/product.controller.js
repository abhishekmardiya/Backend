const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

router.post("", authenticate, async (req, res) => {
  //passing uers's id to product model
  //user._id is from decoded
  req.body.user_id = req.user._id;
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.status(200).send({ products: products });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch(
  "/:id",
  authenticate,
  authorise(["admin", "seller"]),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.status(200).send({ product: product });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;
