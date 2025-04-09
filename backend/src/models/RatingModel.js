const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingSchema = new Schema ({
    offerId:{
        type:Schema.Types.ObjectId,
        ref:"offer",
    },
    restaurantName: {
        type: String,
        required: true,
      },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    comments:{
        type:String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,   // Minimum rating value
        max: 5    // Maximum rating value
    },
},{
    timestamps:true
})

module.exports = mongoose.model("rating", ratingSchema)