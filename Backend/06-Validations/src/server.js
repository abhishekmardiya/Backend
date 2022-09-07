//always import from index.js
const app = require("./index");

const connect = require("./configs/db");

app.listen(3000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }
  console.log("listening on port 3000");
});
