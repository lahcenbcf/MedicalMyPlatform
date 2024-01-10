const mongoose = require('mongoose');
const dotEnv=require("dotenv").config()
const connect = async () => {
  try {
    const connectionUri = process.env.connectionUri;
    try {
      await mongoose.connect(connectionUri);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return error
  }
};

module.exports={
    connect
}
