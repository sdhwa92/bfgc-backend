const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTypeSchema = new Schema({
  typeName: String,
  Permissions: [{ type: String }],
});

module.exports = userTypeSchema;
