const mongoose = require("mongoose");
const { Schema } = mongoose;
const optionSchema = require("./Option");

const fieldSchema = new Schema({
  type: { type: String, enum: ["text", "select"], default: "text" },
  label: String,
  presenter: String,
  description: { type: String, required: false },
  options: [optionSchema],
  order: Number,
});

module.exports = fieldSchema;
