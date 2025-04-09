const locationModel = require("../models/LocationModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const { Network } = require("inspector");
const LocationModel = require("../models/LocationModel");

//storage
const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....
const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

const addLocation = async (req, res) => {
  try {
    const saveLocation = await locationModel.create(req.body);
    res.status(201).json({
      message: "added location successfully",
      data: saveLocation,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllLocation = async (req, res) => {
  try {
    const fetchLocation = await locationModel
      .find()
      .populate("stateId","name")
      .populate("cityId","name")
      .populate("areaId","name");
    res.status(200).json({
      message: "fetch all added location successfully",
      data: fetchLocation,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const addWithFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log("Cloudinary Response:", cloudinaryResponse);

      // Store URL in database
      req.body.imageURL = cloudinaryResponse.secure_url;
      const savedImage = await locationModel.create(req.body);
      console.log("Saved Data:", savedImage);

      res.status(200).json({
        message: "file saved successfully",
        data: savedImage,
      });
    });
  } catch (error) {
    console.error("Error in addFile:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllLocationByUserId = async (req, res) => {
  try {
    const location = await locationModel
      .find({ userId: req.params.userId })
      .populate("stateId cityId areaId userId");
    if (location.length === 0) {
      res.status(404).json({ message: "No location found" });
    } else {
      res.status(200).json({
        message: "location found successfully",
        data: location,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};




const updatedLocationById = async (req, res) => {
  try {
    const updateData = await locationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateData) {
      return res.status(404).json({ message: "Location not found!" });
    } else {
      res.status(200).json({
        message: "location update successfully",
        data: updateData,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getLocationById = async (req, res) => {
  try {
    const getById = await locationModel.findById(req.params.id);

    if (!getById) {
      return res.status(404).json({ message: "Location not found!" });
    } else {
      res.status(200).json({
        message: "location found successfully",
        data: getById,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteLocationById = async (req, res) => {
  try {
    const deletedLocation = await LocationModel.findByIdAndDelete(req.params.id);

    if (!deletedLocation) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    res.status(200).json({
      message: "Location deleted successfully",
      data: deletedLocation,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  addLocation,
  getAllLocation,
  addWithFile,
  getAllLocationByUserId,
  updatedLocationById,
  getLocationById,
  deleteLocationById,

  
};
