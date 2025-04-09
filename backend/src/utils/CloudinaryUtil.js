const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
  //conifg
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
  return cloudinaryResponse;
};

module.exports = {
  uploadFileToCloudinary,
};
