const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;

const deviceSchema = new Schema({
  uniqueDeviceId: String,
});

deviceSchema.plugin(findOrCreate);

mongoose.model("Device", deviceSchema);
