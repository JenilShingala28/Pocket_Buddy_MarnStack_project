// const User = require("../models/UserModel");
// const Reservation = require("../models/ReservationModel");
// const Parking = require("../models/ParkingModel");
const location = require("../models/LocationModel")
const offer = require("../models/OfferModel")
const rating = require("../models/RatingModel")
const user = require("../models/UserModel")


const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await user.countDocuments();
        
        const totalRestaurants = await location.countDocuments();

    
        const totalOffer = await offer.countDocuments();

        
        const totalRating = await rating.countDocuments();

        res.status(200).json({
            message: "Dashboard stats fetched successfully",
            data: { totalUsers,totalRestaurants, totalOffer, totalRating }
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard stats",
            error: error.message
        });
    }
};


const getLatest = async (req, res) => {
    try {
        const latest = await Reservation.find()
            .sort({ createdAt: -1 }) 
            .limit(5); 

        res.status(200).json({
            message: "Latest bookings fetched successfully",
            data: latest
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch latest bookings",
            error: error.message
        });
    }
};

module.exports = { getDashboardStats, getLatest }; 