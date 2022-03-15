const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  title: String,
  serviceDate: Date,
  createdAt: Date,
  lastModified: Date,
  _template: { type: Schema.Types.ObjectId, ref: "Template" },
});

mongoose.model("Service", serviceSchema);
