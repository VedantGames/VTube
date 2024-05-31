const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Video = require("../models/Video.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandeller = require("../utils/asyncHandeller");
const uploadOnCloudinary = require("../utils/cloudinary");
const { timePassed, calcDuration } = require("../utils/utils");

const uploadVideo = asyncHandeller( async (req, res) => {
  const videoFileLocalPath = req.file.path;

  if (videoFileLocalPath === '' || videoFileLocalPath === undefined) throw new ApiError(400, 'Video file not found');

  const cloudinaryVideoURL = await uploadOnCloudinary(videoFileLocalPath);

  if (cloudinaryVideoURL === undefined) throw new ApiError(400, 'error uploading video file');

  return res.status(200).json(
    new ApiResponse(200, { public_id: cloudinaryVideoURL.public_id, duration: cloudinaryVideoURL.duration }, 'Video uploaded successfully')
  );
});

const uploadThumbnail = asyncHandeller( async (req, res) => {
  const thumbnailFileLocalPath = req.file.path;

  if (thumbnailFileLocalPath === '' || thumbnailFileLocalPath === undefined) throw new ApiError(400, 'Thumbnail file not found');

  const cloudinaryThumbnailURL = await uploadOnCloudinary(thumbnailFileLocalPath);

  if (cloudinaryThumbnailURL === undefined) throw new ApiError(400, 'error uploading thumbnail file');

  return res.status(200).json(
    new ApiResponse(200, cloudinaryThumbnailURL.public_id, 'Thumbnail uploaded successfully')
  );
});

const publishVideo = asyncHandeller( async (req, res) => {
  const { owner, videoURL:videoFile, thumbnail, title, description, duration, visiblity, madeForKids } = req.body;

  if (videoFile === '' || videoFile === undefined) throw new ApiError(400, 'Video is required');
  if (thumbnail === '' || thumbnail === undefined) throw new ApiError(400, 'Thumbnail is required');
  if (visiblity === '' || visiblity === undefined) throw new ApiError(400, 'Visiblity is required');
  if (madeForKids === '' || madeForKids === undefined) throw new ApiError(400, 'Made for kids is required');

  const uploadData = {
    owner,
    videoFile,
    thumbnail,
    title,
    descripton: description,
    duration,
    visiblity,
    madeForKids
  };

  const video = await Video.create(uploadData);

  if (!video) throw new ApiError(400, 'Error in publishing video');

  const ownerData = await User.findById(owner);

  const userAfterVideoPublished = await ownerData.addVideo(video._id);

  if (!ownerData || !userAfterVideoPublished) {
    Video.findByIdAndDelete(video._id);
    throw new ApiError(400, 'Error in adding video to user');
  }

  return res.status(200).json(
    new ApiResponse(200, { user: userAfterVideoPublished }, 'Video published successfully')
  );
});


const subscribe = asyncHandeller( async (req, res) => {
  const { userId, channelId } = req.body;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');
  
  const channel = await User.findById(channelId);
  
  if (!channel) throw new ApiError(400, 'Channel not found');
  
  const finalUser = await user.subscribe(channelId);
  
  const finalChannel = await channel.addSubscriber();

  return res.status(200).json(
    new ApiResponse(200, { user: finalUser, channel: finalChannel }, "Subscribed successfully")
  );
});

const unsubscribe = asyncHandeller( async (req, res) => {
  const { userId, channelId } = req.body;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');
  
  const channel = await User.findById(channelId);
  
  if (!channel) throw new ApiError(400, 'Channel not found');
  
  const finalUser = await user.unsubscribe(channelId);
  
  const finalChannel = await channel.remSubscriber();

  return res.status(200).json(
    new ApiResponse(200, { user: finalUser, channel: finalChannel }, "Subscribed successfully")
  );
});

const likeVideo = asyncHandeller( async (req, res) => {
  const { userId, videoId } = req.body;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');
  
  const video = await Video.findById(videoId);
  
  if (!video) throw new ApiError(400, 'Video not found');
  
  if (await user.likeVideo(videoId))
    await video.remDislike();

  const userAfterLike = await User.findById(user._id).select('-password');
  
  const finalVideo = await video.addLike();

  return res.status(200).json(
    new ApiResponse(200, { user: userAfterLike, video: finalVideo })
  )
});

const unlikeVideo = asyncHandeller( async (req, res) => {
  const { userId, videoId } = req.body;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');
  
  const video = await Video.findById(videoId);
  
  if (!video) throw new ApiError(400, 'Video not found');
  
  const finalUser = await user.unlikeVideo(videoId);

  const userAfterLike = await User.findById(finalUser._id).select('-password');
  
  const finalVideo = await video.remLike();

  return res.status(200).json(
    new ApiResponse(200, { user: userAfterLike, video: finalVideo })
  )
});

const dislikeVideo = asyncHandeller( async (req, res) => {
  const { userId, videoId } = req.body;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');
  
  const video = await Video.findById(videoId);
  
  if (!video) throw new ApiError(400, 'Video not found');
  
  if (await user.dislikeVideo(videoId))
    await video.remLike();

  const userAfterLike = await User.findById(user._id).select('-password');
  
  const finalVideo = await video.addDislike();

  return res.status(200).json(
    new ApiResponse(200, { user: userAfterLike, video: finalVideo })
  )
});

const undislikeVideo = asyncHandeller( async (req, res) => {
  const { userId, videoId } = req.body;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');
  
  const video = await Video.findById(videoId);
  
  if (!video) throw new ApiError(400, 'Video not found');
  
  const finalUser = await user.undislikeVideo(videoId);

  const userAfterLike = await User.findById(finalUser._id).select('-password');
  console.log(userAfterLike);
  
  const finalVideo = await video.remDislike();

  return res.status(200).json(
    new ApiResponse(200, { user: userAfterLike, video: finalVideo })
  )
});

const getChannelVideos = asyncHandeller( async (req, res) => {
  const { channelId } = req.params;

  const user = await User.findById(channelId);

  if (!user) throw new ApiError(400, 'User not found');

  const videosIDs = user.videos;

  const videos = [];
  var video = null;
  
  for (let i = videosIDs.length - 1; i >= 0; i--) {
    video = await Video.findById(videosIDs[i]);
    if (video.visiblity === 'Public')
      videos.push({
        _id: video._id,
        thumbnail: video.thumbnail,
        title: video.title,
        views: video.views,
        timePassed: timePassed(video.createdAt),
        duration: calcDuration(Math.round(video.duration))
      });
  }

  return res.status(200).json(
    new ApiResponse(200, videos, 'Videos loaded successfully')
  );
});

const getAllVideos = asyncHandeller( async (req, res) => {
  const videos = await Video.find().sort({createdAt: -1}).limit(20);

  if (videos.length === 0) throw new ApiError(400, 'No videos found');


  var finalVideos = [];
  var owner = null;
  for (let i = 0; i < videos.length; i++) {
    if (i === 0) videos[i].duration = 560;
    if (i === 1) videos[i].duration = 459;
    if (i === 2) videos[i].duration = 1268;
    if (i === 3) videos[i].duration = 25789;
    if (i === 4) videos[i].duration = 592;
    if (i === 5) videos[i].duration = 608;
    if (i === 6) videos[i].duration = 115;
    owner = await User.findById(videos[i].owner);

    if (videos[i].visiblity === "Public") {
      finalVideos.push({
        _id: videos[i]._id,
        thumbnail: videos[i].thumbnail,
        title: videos[i].title,
        views: videos[i].views,
        timePassed: timePassed(videos[i].createdAt),
        duration: calcDuration(Math.round(videos[i].duration)),
        channelImg: owner.profileImage,
        channelName: owner.fullName
      });
    }
  }

  return res.status(200).json(
    new ApiResponse(200, finalVideos, 'Success')
  );
});

const getVideo = asyncHandeller( async (req, res) => {
  const { userId, videoId } = req.params;

  const user = await User.findById(userId);

  if (user) await user.watchVideo(videoId);

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(400, 'Video not found');

  // Add video to history using cookies

  const fVideo = await video.addView();

  const channel = await User.findById(fVideo.owner);

  if (!fVideo ||!channel) throw new ApiError(400, 'Error in loading video');

  var finalVideo = {};
  if (fVideo.visiblity === "Public") {
    finalVideo = {
      _id: fVideo._id,
      videoFile: fVideo.videoFile,
      title: fVideo.title,
      views: fVideo.views,
      likes: fVideo.likes,
      timePassed: timePassed(fVideo.createdAt),
      duration: calcDuration(Math.round(fVideo.duration)),
      description: fVideo.descripton,
      comments: fVideo.comments
    };
  }

  return res.status(200).json(
    new ApiResponse(200, { video: finalVideo, channel }, 'Success')
  );
});

const getSubscriptionVideos = asyncHandeller( async (req, res) => {
  const { userId } = req.params;

  if (userId === undefined || userId === '') throw new ApiError(400, 'User not found');

  const userSubscriptions = await User.findById(userId).select('subscriptions');

  const videos = await Video.find({ owner: { $in: userSubscriptions.subscriptions } }).sort({ createdAt: -1 }).limit(20);
  videos.sort((a, b) => b.views - a.views);
  
  var finalVideos = [];
  var owner = null;
  for (let i = 0; i < videos.length; i++) {
    if (i === 0) videos[i].duration = 560;
    if (i === 1) videos[i].duration = 459;
    if (i === 2) videos[i].duration = 1268;
    if (i === 3) videos[i].duration = 25789;
    if (i === 4) videos[i].duration = 592;
    if (i === 5) videos[i].duration = 608;
    if (i === 6) videos[i].duration = 115;
    owner = await User.findById(videos[i].owner);

    if (videos[i].visiblity === "Public") {
      finalVideos.push({
        _id: videos[i]._id,
        thumbnail: videos[i].thumbnail,
        title: videos[i].title,
        views: videos[i].views,
        timePassed: timePassed(videos[i].createdAt),
        duration: calcDuration(Math.round(videos[i].duration)),
        channelImg: owner.profileImage,
        channelName: owner.fullName
      });
    }
  }
  
  return res.status(200).json(
    new ApiResponse(200, finalVideos)
  );
});

const getTrendingVideos = asyncHandeller( async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 }).limit(20);

  videos.sort((a, b) => b.views - a.views);

  var finalVideos = [];
  var owner = null;
  for (let i = 0; i < videos.length; i++) {
    if (i === 0) videos[i].duration = 560;
    if (i === 1) videos[i].duration = 459;
    if (i === 2) videos[i].duration = 1268;
    if (i === 3) videos[i].duration = 25789;
    if (i === 4) videos[i].duration = 592;
    if (i === 5) videos[i].duration = 608;
    if (i === 6) videos[i].duration = 115;
    owner = await User.findById(videos[i].owner);

    if (videos[i].visiblity === "Public") {
      finalVideos.push({
        _id: videos[i]._id,
        thumbnail: videos[i].thumbnail,
        title: videos[i].title,
        views: videos[i].views,
        timePassed: timePassed(videos[i].createdAt),
        duration: calcDuration(Math.round(videos[i].duration)),
        channelName: owner.fullName,
        description: videos[i].descripton
      });
    }
  }

  return res.status(200).json(
    new ApiResponse(200, finalVideos)
  );
})

const search = asyncHandeller( async (req, res) => {
  const { query } = req.params;

  const videos = await Video.find({
    title: {
      $regex: query,
      $options: "i"
    }
  }).sort({ createdAt: -1 }).limit(20);

  var channels = await User.find({
    $or: [
      {
        userName: {
          $regex: query,
          $options: 'i'
        },
        fullName: {
          $regex: query,
          $options: 'i'
        }
      }
    ]
  }).sort({ subscribers: 1 }).limit(10);

  var channel = null;
  var finalVideos = [];
  for (let i = 0; i < videos.length; i++) {
    if (i === 0) videos[i].duration = 560;
    if (i === 1) videos[i].duration = 459;
    if (i === 2) videos[i].duration = 1268;
    if (i === 3) videos[i].duration = 25789;
    if (i === 4) videos[i].duration = 592;
    if (i === 5) videos[i].duration = 608;
    if (i === 6) videos[i].duration = 115;
    channel = await User.findById(videos[i].owner);

    finalVideos.push({
      _id: videos[i]._id,
      thumbnail: videos[i].thumbnail,
      title: videos[i].title,
      views: videos[i].views,
      description: videos[i].descripton,
      timePassed: timePassed(videos[i].createdAt),
      duration: calcDuration(Math.round(videos[i].duration)),
      channelImg: channel.profileImage,
      channelName: channel.fullName
    })
  }

  channels = channels.map(channel => {
    return {
      _id: channel._id,
      name: channel.fullName,
      userName: channel.userName,
      img: channel.profileImage,
      subscribers: channel.subscribers,
      bio: channel.bio
    }
  })

  return res.status(200).json(
    new ApiResponse(200, { videos: finalVideos, channels }, 'Success')
  );
});

const getComments = asyncHandeller( async (req, res) => {
  const { videoId } = req.params;

  const commentIds = await Video.findById(videoId).select('comments');

  const comments = await Comment.find({ _id: { $in: commentIds.comments } }).sort({ createdAt: -1 });

  const data = [];
  for (let i = 0; i < comments.length; i++) {
    const user = await User.findById(comments[i].owner);

    data.push({
      _id: comments[i]._id,
      content: comments[i].content,
      owner: {
        profileImage: user.profileImage,
        userName: user.userName
      },
      likes: comments[i].likes,
      timePassed: timePassed(Math.round(comments[i].createdAt))
    })
  }

  return res.status(200).json(
    new ApiResponse(200, data)
  );
})

module.exports = {
  uploadVideo,
  uploadThumbnail,
  publishVideo,
  subscribe,
  unsubscribe,
  likeVideo,
  unlikeVideo,
  dislikeVideo,
  undislikeVideo,
  getChannelVideos,
  getAllVideos,
  getVideo,
  getSubscriptionVideos,
  getTrendingVideos,
  search,
  getComments
}