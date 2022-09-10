const express = require("express");

const app = express();

//starting the express on server(localhost 3000)
//this is called listening on port 3000
app.listen(3000, () => {
  console.log("server has started");
});

app.get("/users", (req, res) => {
  console.log("Hello when server starts at http://localhost:3000/users");
  //shown in the browser at http://localhost:3000/users
  res.send("Hello");
});

app.get("/students", (req, res) => {
  //shown in the browser at http://localhost:3000/students
  res.send({ name: "abhishek" });

  //checking the method
  console.log("the method is", req.method);
});
