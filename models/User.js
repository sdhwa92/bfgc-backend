const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;
const UserTypeSchema = require("./UserType");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  username: String,
  password: { type: String, select: false },
  email: { type: String, required: false },
  type: UserTypeSchema,
});

userSchema.plugin(findOrCreate);

mongoose.model("User", userSchema);
