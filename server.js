//Basic server
const express = require("express"); //Get the express
const bodyParser = require("body-parser"); //parsing the UI input
const passport = require("passport"); //get passport for authentication method
const DBConn = require("./config/db");
const app = express(); //Initialize the app variable
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Connect to the database
DBConn();
app.get("/", (req, res) => res.send(`API running`)); // simple endpoint to test the API
//passport middleware and config
app.use(passport.initialize());
require("./config/passport")(passport);
//Define routes
//Test routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000; // Look for an environment variable called 'PORT' during deployement, default is 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //simple callback after connecting to server
