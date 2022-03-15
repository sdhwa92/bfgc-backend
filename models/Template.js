const mongoose = require("mongoose");
const { Schema } = mongoose;
const contentSchema = require("./Content");

const templateSchema = new Schema({
  name: String,
  contents: [contentSchema],
  createdAt: Date,
  lastModified: Date,
  _createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Template", templateSchema);
