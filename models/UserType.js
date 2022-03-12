const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTypeSchema = new Schema({
  typeName: String,
});

mongoose.model("userTypes", userTypeSchema);
