const ApiError = require('./ApiError');
const asyncHandeller = require('./asyncHandeller');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localPath) => {
  try {
    const cloudinaryImageURL = await cloudinary.uploader.upload(localPath, {
      resource_type: 'auto'
    });
    
    return cloudinaryImageURL;
  } catch (error) {
    throw new ApiError(400, "Error in uploading image to cloudinary: " + error.message);
  }
};

module.exports = uploadOnCloudinary;