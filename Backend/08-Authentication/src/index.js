const express = require("express");
const connect = require("./configs/db");
const app = express();

const userController = require("./controllers/user.controller");
const { register, login } = require("./controllers/auth.controller");
const productController = require("./controllers/product.controller");

app.use(express.json());

app.use("/users", userController);

//for authenticate
app.post("/register", register);
app.post("/login", login);

app.use("/products", productController);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
