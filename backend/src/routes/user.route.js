const Router = require('express');

const { registerUser, loginUser, uploadProfileImage, uploadProfileBanner, getUserHistory, getChannel, getSubscriptions, getYouHistory, addToWatchLater } = require('../controllers/User.controller');
const {multerUploadImg} = require('../middlewares/multer.middleware');

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/upload-profile-image').post(multerUploadImg.single('photos'), uploadProfileImage);
router.route('/upload-profile-banner').post(multerUploadImg.single('photos'), uploadProfileBanner);
router.route('/add-to-watch-later').post(addToWatchLater);

router.route('/user-history/:userId').get(getUserHistory);
router.route('/you-history/:userId').get(getYouHistory);
router.route('/channel/:channelName').get(getChannel);
router.route('/subscriptions/:userId').get(getSubscriptions);

module.exports = router;