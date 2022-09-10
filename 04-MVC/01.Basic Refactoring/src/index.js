const express = require("express");
const app = express();

//importing controller(whole router)
const userscontroller = require("./controllers/user.controllers");
const postscontroller = require("./controllers/post.controllers");
const commentscontroller = require("./controllers/comment.controllers");

//this middleware converts json body to javascript object while posting the data
app.use(express.json());

//if route starts from /users then go to the users controllers.this syntaxes is nothing but it can redirects express to perticular route(remove the /users in route from usersController because otherwise we have to make a request on http://localhost:3000/users/users)
app.use("/users", userscontroller);
//if route starts from /posts then go to the posts controllers
app.use("/posts", postscontroller);
//if route starts from /comments then go to the comments controllers
app.use("/comments", commentscontroller);

//for server.js
module.exports = app;
