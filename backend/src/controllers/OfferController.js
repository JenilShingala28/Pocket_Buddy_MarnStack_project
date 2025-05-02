const offerModel = require("../models/OfferModel");

const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

//storage
const storage = multer.diskStorage({
  destination: "/upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object
const upload = multer({
  storage: storage,
}).single("image");

const addOffer = async (req, res) => {
  try {
    const saveOffer = await offerModel.create(req.body);
    res.status(201).json({
      message: "added offer successfully",
      data: saveOffer,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
//   try {
//     const fetchOffer = await offerModel
//       .find()
//       .populate("locationId", "name")
//       .populate("userId", "name email"); // Populate only necessary fields
//     res.status(201).json({
//       message: "fetch all offer successfully",
//       data: fetchOffer,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "offer not found",
//     });
//   }
// };

const getAllOffer = async (req, res) => {
  try {
    const fetchOffer = await offerModel.find().populate("userId");
    res.status(201).json({
      message: "fetch all offer successfully",
      data: fetchOffer,
    });
  } catch (err) {
    res.status(500).json({
      message: "offer not found",
    });
  }
};

const deleteOfferById = async (req, res) => {
  try {
    const deletedOffer = await offerModel.findByIdAndDelete(req.params.id);

    if (!deletedOffer) {
      return res.status(404).json({
        message: "Offer not found",
      });
    }

    res.status(200).json({
      message: "Offer deleted successfully",
      data: deletedOffer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getAllOfferByUserId = async (req, res) => {
  try {
    const offer = await offerModel
      .find({ userId: req.params.userId })
      .populate("address");
    if (offer.length === 0) {
      res.status(404).json({ message: "No offer found" });
    } else {
      res.status(200).json({
        message: "offer found successfully",
        data: offer,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateOfferById = async (req, res) => {
  try {
    const updateData = await offerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateData) {
      return res.status(404).json({ message: "offer  not found!" });
    } else {
      res.status(200).json({
        message: "offer update successfully",
        data: updateData,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateOfferById1 = async (req, res) => {
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
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        console.log("Cloudinary Response:", cloudinaryResponse);

        // Store the image URL in the request body
        req.body.imageURL = cloudinaryResponse.secure_url;
      }

      // Update the location with the new data, including the new image URL if uploaded
      const updateData = await offerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "Offer not found!" });
      } else {
        res.status(200).json({
          message: "Offer updated successfully",
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

const getOfferById = async (req, res) => {
  // get data by particular id
  // const foundUserData = await UserModel.findById(req.params.id)
  // get data by particular id and show particular fields

  try {
    const foundUserData = await offerModel.findById(req.params.id);
    if (!foundUserData) {
      return res.status(404).json({ message: "offer Data not found!" });
    } else {
      res.status(201).json({
        message: " found offer by id successfully",
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

const addWithOfferFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(500).json({ message: err.message });
      }

      console.log("Uploaded File:", req.file); // Debugging

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log("Cloudinary Response:", cloudinaryResponse);

      // Store URL in database
      req.body.imageURL = cloudinaryResponse.secure_url;
      const savedImage = await offerModel.create(req.body);
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
module.exports = {
  addOffer,
  getAllOffer,
  deleteOfferById,
  getAllOfferByUserId,
  updateOfferById,
  getOfferById,
  addWithOfferFile,

  updateOfferById1
};
