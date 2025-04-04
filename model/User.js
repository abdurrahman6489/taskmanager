const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  token: { type: String, required: false, default: "" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
