// external file used by server.js for connection to MongoDB database
const mongoose = require("mongoose"); // get the mongoose
const config = require("config"); // get the config file
const dbConnect = config.get("mongoURI"); // get the connection string to the DB
const DBConn = async () => {
  try {
    await mongoose.connect(dbConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected !");
  } catch (err) {
    console.error(err.message);
    process.exit(1); //exit if connection is failed
  }
}; // connection function which is exported to the server.js file
module.exports = DBConn;
