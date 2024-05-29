const Router = require('express');

console.log('importing');
const { registerUser, loginUser, uploadProfileImage, uploadProfileBanner, getUserHistory, getChannel, subscribe, unsubscribe, getSubscriptions } = require('../controllers/User.controller');
console.log('yaha par bhi ho sakta h');
const {multerUploadImg} = require('../middlewares/multer.middleware');
console.log('bilkul yahi par h');

const router = Router();
console.log('user router created');

router.route('/register').post(registerUser);
console.log('register');
router.route('/login').post(loginUser);
console.log('login');
router.route('/upload-profile-image').post(multerUploadImg.single('photos'), uploadProfileImage);
console.log('upi');
router.route('/upload-profile-banner').post(multerUploadImg.single('photos'), uploadProfileBanner);
console.log('upb');
router.route('/subscribe').post(subscribe);
console.log('subs');
router.route('/unsubscribe').post(unsubscribe);
console.log('unsubs');

router.route('/user-history/:userId').get(getUserHistory);
console.log('uh');
router.route('/channel/:channelName').get(getChannel);
console.log('cn');
router.route('/subscriptions/:userId').get(getSubscriptions);
console.log('subssuid');

module.exports = router;