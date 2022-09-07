const express = require("express");
const app = express();

const userscontroller = require("./controllers/user.controllers");

app.use(express.json());

app.use("/users", userscontroller);

module.exports = app;
