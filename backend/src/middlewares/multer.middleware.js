const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
});

const videosStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos',
    allowedFormats: ['mp4', 'ogg', 'wav']
  }
});

const multerUploadImg = multer({ storage: imagesStorage });
const multerUploadVid = multer({ storage: videosStorage });
console.log('me bol rha tha yahi par h');
module.exports = { multerUploadImg, multerUploadVid };