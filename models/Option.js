const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  optionId: String,
  value: String,
});

module.exports = optionSchema;
