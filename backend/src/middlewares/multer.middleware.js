const multer = require('multer');

const multerUploadImg = multer({ dest: '../../public/temp/imgs' });
const multerUploadVid = multer({ dest: '../../public/temp/videos' });

module.exports = { multerUploadImg, multerUploadVid };