const mongoose = require('mongoose');

//connect mongoose with mongoDB
const connect = () => {
  return mongoose.connect(
    'mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/express-relationship'
  );
};

module.exports = connect;
