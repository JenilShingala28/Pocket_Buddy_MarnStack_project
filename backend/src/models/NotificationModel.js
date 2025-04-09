const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["Unread", "Read"],
        default: "Unread", // Setting default status
        required: true,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt & updatedAt
    })
    
module.exports = mongoose.model("notification", notificationSchema)