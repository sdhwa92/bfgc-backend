const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;
const roleSchema = require("./Role");

const userSchema = new Schema({
  googleId: String,
  firstName: {
    type: String,
    required: [true, "first name not provided"],
  },
  lastName: {
    type: String,
    required: [true, "last name not provided"],
  },
  phoneNumber: String,
  password: { type: String, required: true },
  email: {
    type: String,
    unique: [true, "this email address already exists"],
    lowercase: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  role: roleSchema,
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(findOrCreate);

mongoose.model("User", userSchema);
