const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

const transporter = require("../configs/mail");
const path = require("path");


router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // send mail with defined transport object
    transporter.sendMail({
      from: '"Amazon Admin" <admin@amazon.com>', // sender address
      to: product.sellerMail, // list of receivers
      subject: "Your product is successfully uploaded", // Subject line
      text: "Hello sir/madam , Your product is successfully uploaded", // plain text body
      // html: "<b>Hello sir/madam , Your product is successfully uploaded</b>", // html body

      //sending html
      alternatives: [
        {
          contentType: "text/html",
          path: path.join(__dirname, "../test.html"),
        },
        //attachment
        {
          filename: "test.txt",
          path: path.join(__dirname, "../test.txt"),
        },
      ],
    });

    return res.status(201).send({ message: "product uploaded successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
module.exports = router;
