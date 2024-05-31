const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Video = require("../models/Video.model");

const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandeller = require("../utils/asyncHandeller");
const { timePassed, calcDuration } = require("../utils/utils");

const addComment = asyncHandeller( async (req, res) => {
  const { owner, video: videoId, content } = req.body;

  if (owner === undefined || owner === null) throw new ApiError(400, 'User not found');
  if (videoId === undefined || videoId === null) throw new ApiError(400, 'Video not found');
  if (content === undefined || content === '') throw new ApiError(400, 'Content is requires');

  const comment = await Comment.create({
    owner,
    videoId,
    content
  });

  if (!comment) throw new ApiError(400, 'Error in adding comment');

  const ownerData = await User.findById(owner);

  const user = await ownerData.commentOnVideo(comment._id);
  
  const videoData = await Video.findById(videoId).select('-password');

  const video = await videoData.addComment(comment._id);

  var finalVideo = {};
  if (video.visiblity === "Public") {
    finalVideo = {
      _id: video._id,
      videoFile: video.videoFile,
      title: video.title,
      views: video.views,
      likes: video.likes,
      timePassed: timePassed(video.createdAt),
      duration: calcDuration(Math.round(video.duration)),
      description: video.descripton,
      comments: video.comments
    };
  }

  return res.status(200).json(
    new ApiResponse(200, { user, video: finalVideo })
  );
});

module.exports = {
  addComment
}