const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    enum: ["cafe", "seafood", "dessert", "fast_food"],
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timing: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "city",
  },
  areaId: {
    type: Schema.Types.ObjectId,
    ref: "area",
  },
  // roleId:{
  //     type:Schema.Types.ObjectId,
  //     ref:"roles",
  // },
  foodType: {
    enum: ["vegetarian", "non_vegetarian", "vegan", "organic"],
    type: String,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  imageURL: {
    //type:String
    type: [String],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("location", locationSchema);
