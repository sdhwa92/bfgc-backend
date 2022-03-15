const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/Device");
require("./models/Template");
require("./models/Service");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

console.log("App is running");

const PORT = process.env.PORT || 5000;
app.listen(PORT);
