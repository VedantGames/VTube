const Router = require('express');

const { multerUploadVid } = require('../middlewares/multer.middleware');
const { uploadVideo, uploadThumbnail, publishVideo, getChannelVideos, getAllVideos, getVideo, search } = require('../controllers/Video.controller');

const router = Router();

router.route('/upload-video').post(multerUploadVid.single('video'), uploadVideo);
router.route('/upload-thumbnail').post(multerUploadVid.single('image'), uploadThumbnail);
router.route('/publish-video').post(publishVideo);

router.route('/channel-videos/:channelId').get(getChannelVideos);
router.route('/all-videos').get(getAllVideos);
router.route('/video/:userId/:videoId').get(getVideo);
router.route('/search/:query').get(search);

module.exports = router;