const mongoose = require('mongoose');

//connect mongoose with mongoDB
const connect = () => {
  return mongoose.connect(
    'mongodb://localhost:27017/mvc'
  );
};

module.exports = connect;
