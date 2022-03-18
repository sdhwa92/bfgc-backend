const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;
const roleSchema = require("./Role");

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  username: String,
  password: { type: String, select: false },
  email: { type: String, required: false },
  role: roleSchema,
});

userSchema.plugin(findOrCreate);

mongoose.model("User", userSchema);
