const express = require("express");
const app = express();

app.listen(5000, (req, res) => {
  console.log("listening on port 5000");
});

app.use(logger);

app.get("/users", (req, res) => {
  res.send({ route: "/users", role: req.role });
});

app.get("/students", (req, res) => {
  res.send({ route: "/students", role: req.role });
});

app.get("/admin", (req, res) => {
  res.send({ route: "/students", role: req.role });
});

function logger(req, res, next) {
  if (req.path === "/users") {
    req.role = "user";
  } else if (req.path === "/students") {
    req.role = "student";
  } else {
    req.role = "somebody";
  }

  next();
}
