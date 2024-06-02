const Router = require('express');

const { multerUploadVid } = require('../middlewares/multer.middleware');
const {
  uploadVideo, uploadThumbnail, publishVideo, getChannelVideos, getAllVideos,
  getVideo, search, getSubscriptionVideos, getTrendingVideos, subscribe,
  unsubscribe, likeVideo, unlikeVideo, dislikeVideo, undislikeVideo, getComments,
  getWatchLaterVideos, getLikedVideos, getAllPlaylists
} = require('../controllers/Video.controller');

const router = Router();

router.route('/upload-video').post(multerUploadVid.single('video'), uploadVideo);
router.route('/upload-thumbnail').post(multerUploadVid.single('image'), uploadThumbnail);
router.route('/publish-video').post(publishVideo);
router.route('/subscribe').post(subscribe);
router.route('/unsubscribe').post(unsubscribe);
router.route('/like').post(likeVideo);
router.route('/unlike').post(unlikeVideo);
router.route('/dislike').post(dislikeVideo);
router.route('/undislike').post(undislikeVideo);

router.route('/channel-videos/:channelId').get(getChannelVideos);
router.route('/all-videos').get(getAllVideos);
router.route('/video/:userId/:videoId').get(getVideo);
router.route('/watch-later/:userId').get(getWatchLaterVideos);
router.route('/liked/:userId').get(getLikedVideos);
router.route('/search/:query').get(search);
router.route('/subscriptions/:userId').get(getSubscriptionVideos);
router.route('/trending').get(getTrendingVideos);
router.route('/comments/:videoId').get(getComments);
router.route('/all-playlists/:userId').get(getAllPlaylists);

module.exports = router;