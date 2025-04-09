const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // active: {
    //   type: Boolean,
    //   default: true,
    // },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    foodType: {
      type: String,
      enum: ["burger", "pizza", "coffee", "pasta","dessert"],
      required: true,
    },
    termsConditions: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("offer", offerSchema);
