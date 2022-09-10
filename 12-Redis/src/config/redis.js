const { createClient } = require("redis");

//url is not compulsory to pass , its optional
const client = createClient({ url: "redis://localhost:6379" });

//for catching error whenever client not able to connect to redis
//error id an event
client.on("error", (err) => {
  console.error({ message: err.message });
});

module.exports = client;
