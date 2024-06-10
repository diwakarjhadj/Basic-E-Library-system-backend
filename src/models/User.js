const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function(next) {
  const user = this;
  console.log("User",user);
  if (!user.isModified("password")) return next();
  const hashedpassword = await bcrypt.hash(user.password, 10);
  user.password = hashedpassword;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
