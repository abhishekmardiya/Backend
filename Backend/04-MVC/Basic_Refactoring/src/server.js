//always import from index.js
const app = require("./index");

//importing connect from db.js
const connect = require("./configs/db");

//starting the server
app.listen(3000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }
  console.log("listening on port 3000");
});
