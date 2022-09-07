const express = require("express");
const router = express.Router();

const Todo = require("../models/todo.models");

const client = require("../config/redis");

router.post("", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    //fetching all the todos from database for setting them to redis
    const todos = await Todo.find().lean().exec();

    //setting the todos in redis
    client.set("todos", JSON.stringify(todos));

    return res.status(201).send({ todo: todo });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//outer try-catch is for checking redis connection
//inner try-catch is for checking mongo connection
router.get("", async (req, res) => {
  try {
    //getting todos from redis and not from the database
    client.get("todos", async (err, fetchedTodos) => {
      //if todos are there
      if (fetchedTodos) {
        const todos = JSON.parse(fetchedTodos);

        return res.status(200).send({ todos, isFromRedis: true });
      }
      //if todos are not there then set it again from database
      else {
        try {
          const todos = await Todo.find().lean().exec();

          client.set("todos", JSON.stringify(todos));

          return res.status(200).send({ todos, isFromRedis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    //setting another key in redis(key===> "todos.6318944da06f1421b115e477")
    client.get(`todos.${req.params.id}`, async (err, fetchedTodo) => {
      if (fetchedTodo) {
        const todos = JSON.parse(fetchedTodo);

        return res.status(200).send({ todos, isFromRedis: true });
      } else {
        try {
          const todo = await Todo.findById(req.params.id).lean().exec();

          client.set(`todos.${req.params.id}`, JSON.stringify(todo));

          return res.status(200).send({ todo, isFromRedis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    //update individual todo as well as whole todos
    client.set(`todos.${req.params.id}`, JSON.stringify(todo));
    client.set("todos", JSON.stringify(todo));

    return res.status(201).send({ todo: todo });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();

    const todos = await Todo.find().lean().exec();

    //delete individual todo and set todos again by fetching todos from database
    client.del(`todos.${req.params.id}`);
    client.set("todos", JSON.stringify(todos));

    return res.status(201).send({ todo: todo });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
