const locationModel = require("../models/LocationModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const { Network } = require("inspector");
const LocationModel = require("../models/LocationModel");
const fs = require("fs");

// storage;
// const storage = multer.diskStorage({
//   destination: "./upload",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const uploadDir = path.join(process.cwd(), "upload");

// make sure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ relative folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).array("images", 5);

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
      .populate("stateId", "name")
      .populate("cityId", "name")
      .populate("areaId", "name");
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
const addWithMultipleFiles = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(500).json({ message: err.message });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
      }

      // Upload all images to Cloudinary
      const imageURL = [];
      for (const file of req.files) {
        try {
          const result = await cloudinaryUtil.uploadFileToCloudinary(file);
          imageURL.push(result.secure_url);
        } catch (uploadErr) {
          console.error("Error uploading to Cloudinary:", uploadErr);
          return res.status(500).json({ message: "Error uploading images." });
        }
      }

      // Add image URLs to the body (e.g. req.body.imageURLs or req.body.images)
      req.body.imageURL = imageURL;

      // Save the data to DB
      const savedData = await locationModel.create(req.body);
      console.log("Saved Data:", savedData);

      res.status(200).json({
        message: "Files uploaded and saved successfully",
        data: savedData,
      });
    });
  } catch (error) {
    console.error("Error in addWithMultipleFiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

//update image and data
const updateLocationById1 = async (req, res) => {
  try {
    // Handle the file upload first
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      // Check if an image is uploaded
      if (req.file) {
        // If a new image is uploaded, upload it to Cloudinary
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        console.log("Cloudinary Response:", cloudinaryResponse);

        // Store the image URL in the request body
        req.body.imageURL = cloudinaryResponse.secure_url;
      }

      // Update the location with the new data, including the new image URL if uploaded
      const updateData = await locationModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "Location not found!" });
      } else {
        res.status(200).json({
          message: "Location updated successfully",
          data: updateData,
        });
      }
    });
  } catch (err) {
    console.error("Error in updating location:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
//update multipal img and data
const updateLocationById2 = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log("Upload error:", err);
        return res.status(500).json({ message: err.message });
      }

      // Upload files to Cloudinary
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map((file) =>
          cloudinaryUtil.uploadFileToCloudinary(file)
        );

        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map((result) => result.secure_url);

        // Add image URLs to request body
        req.body.imageURL = imageUrls;
      }

      // Update location with data and image URLs
      const updateData = await locationModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "Location not found!" });
      }

      res.status(200).json({
        message: "Location updated successfully",
        data: updateData,
      });
    });
  } catch (err) {
    console.error("Error in updating location:", err);
    res.status(500).json({ message: "Internal Server Error" });
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
    const deletedLocation = await LocationModel.findByIdAndDelete(
      req.params.id
    );

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

  updateLocationById1,
  addWithMultipleFiles,
  updateLocationById2,
};
