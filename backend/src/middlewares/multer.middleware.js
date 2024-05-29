const multer = require('multer');

const multerUploadImg = multer({ dest: '../../public/temp/imgs' });
const multerUploadVid = multer({ dest: '../../public/temp/videos' });
console.log('me bol rha tha yahi par h');
module.exports = { multerUploadImg, multerUploadVid };