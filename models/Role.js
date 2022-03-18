const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
  roleName: String,
  Permissions: [{ type: String }],
});

module.exports = roleSchema;
