const ratingModel = require("../models/RatingModel");

const addRating = async (req, res) => {
  try {
    const saveRating = await ratingModel.create(req.body);
    res.status(201).json({
      message: "added rating successfully",
      data: saveRating,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllRating = async (req, res) => {
  try {
    const fetchOffer = await ratingModel
      .find()
      .populate("userId")
      .populate("offerId");
    res.status(201).json({
      message: "fetch all offer successfully",
      data: fetchOffer,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};


const deleteRatingById = async (req, res) => {
  try {
    const deletedRating = await ratingModel.findByIdAndDelete(req.params.id);

    if (!deletedRating) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    res.status(200).json({
      message: "Rating deleted successfully",
      data: deletedRating,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


const getAllRatingByUserId = async (req, res) => {
  try {
    const rating = await ratingModel
      .find({ userId: req.params.userId })
      .populate("offerId");
    if (rating.length === 0) {
      res.status(404).json({ message: "No rating found" });
    } else {
      res.status(200).json({
        message: "rating found successfully",
        data: rating,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateRatingById = async (req, res) => {
  try {
    const updateData = await ratingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateData) {
      return res.status(404).json({ message: "rating  not found!" });
    } else {
      res.status(200).json({
        message: "rating update successfully",
        data: updateData,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getRatingById = async (req, res) => {
  // get data by particular id
  // const foundUserData = await UserModel.findById(req.params.id)
  // get data by particular id and show particular fields

  try {
    const foundUserData = await ratingModel.findById(req.params.id);
    if (!foundUserData) {
      return res.status(404).json({ message: "rating Data not found!" });
    } else {
      res.status(201).json({
        message: " found rating by id successfully",
        data: foundUserData,
      });
    }
  } catch (err) {
    {
      res.status(500).json({
        message: err,
      });
    }
  }
};

module.exports = {
  addRating,
  getAllRating,
  deleteRatingById,
  getAllRatingByUserId,
  updateRatingById,
  getRatingById,
};
