const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: { type: String, default: "" },
  userType: { type: Schema.Types.ObjectId, ref: "UserType" },
});

userSchema.plugin(findOrCreate);

mongoose.model("users", userSchema);
