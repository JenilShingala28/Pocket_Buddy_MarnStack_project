const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //fields

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  roleId: {
    type: Schema.Types.ObjectId, //
    ref: "roles",
  },
  password: {
    type: String,
  },
  // plainPassword: {
  //   type: String,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,

    unique: true,
    match: /^[0-9]{10}$/,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  imageURL: {
    type: String,
  },
  address: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
},{
  timestamps : true
});

module.exports = mongoose.model("users", userSchema);
