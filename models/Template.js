const mongoose = require("mongoose");
const { Schema } = mongoose;
const fieldSchema = require("./Field");

const templateSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ["STANDARD", "YOUTH", "WEDNESDAY", "FRIDAY"],
    default: "STANDARD",
  },
  fields: [fieldSchema],
  createdAt: Date,
  lastModified: Date,
  _createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Template", templateSchema);
