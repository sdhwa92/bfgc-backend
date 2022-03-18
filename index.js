const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/Device");
require("./models/Template");
require("./models/Service");

// Execute the passport js file
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

// parse request of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "bfgc-session",
    secret: keys.cookieSecret,
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours,
    httpOnly: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BFGC API application." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
