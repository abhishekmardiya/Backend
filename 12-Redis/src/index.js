const express = require("express");
const app = express();

const todosControllers = require("./controllers/todo.controllers");

app.use(express.json());

app.use("/todos", todosControllers);

module.exports = app;
