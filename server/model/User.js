const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    unique: true,
    required: true,
    max: 20,
  },
  lastName: {
    type: String,
    unique: true,
    required: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  level: {
    type: Number,
    require: true,
    default: 0,
  },
  score: {
    type: Number,
    require: true,
    default: 0,
  },
});
module.exports = mongoose.model("User", userSchema);
