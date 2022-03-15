const mongoose = require("mongoose");
const { Schema } = mongoose;
const optionSchema = require("./Option");

const contentSchema = new Schema({
  type: { type: String, enum: ["text", "select"] },
  title: String,
  presenter: String,
  description: { type: String, required: false },
  options: [optionSchema],
  order: Number,
});

module.exports = contentSchema;
