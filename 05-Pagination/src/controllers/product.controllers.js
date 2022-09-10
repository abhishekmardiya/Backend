const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

//http://localhost:3000/products?page=1&pagesize=30
router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1; //page=1....if it not given then it will take 1 by default
    const pageSize = req.query.pagesize || 10; //pagesize=30...if it not given then it will take 10 by default

    const skipItems = (page - 1) * pageSize;
    //if page is 1 and pagesize is 30 then ==> skipItems = (1 - 1) * 30 =0...so for page 1 , no item will be skipped..so you will see 1 to 30 items
    //if page is 2 and pagesize is 30 then ==> skipItems = (2 - 1) * 30 =30...so for page 2 ,30 item will be skipped..so you will see 31 to 60 items

    const products = await Product.find()
      .skip(skipItems)
      .limit(pageSize)
      .lean()
      .exec();

    //always use ceil value so that we get accurate pagination
    const totalPages =
      Math.ceil(await Product.find().countDocuments()) / pageSize;

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
