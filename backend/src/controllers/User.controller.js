const asyncHandeller = require('../utils/asyncHandeller');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const User = require('../models/User.model');
const uploadOnCloudinary = require('../utils/cloudinary');
const Video = require('../models/Video.model');
const { calcDuration } = require('../utils/utils');

const registerUser = asyncHandeller( async (req, res) => {
  const { fullName, userName, email, password, profileImage, profileBanner, bio } = req.body;

  if ([fullName, userName, email, password].some(field => field === '' || field === undefined)) {
    throw new ApiError(400, "All fields are requires");
  }

  const existingUser = await User.findOne({
    $or: [
      {
        userName
      },
      {
        email
      }
    ] 
  });

  if (existingUser) {
    throw new ApiError(400, "User with email or userName already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    userName: userName,
    profileImage,
    bannerImage: profileBanner,
    bio
  });

  const createdUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(200, createdUser)
  );
});

const loginUser = asyncHandeller( async (req, res) => {
  const {emailOrUsername, password} = req.body;

  if (emailOrUsername === "") throw new ApiError(400, "UserName or Email is required");
  if (password === "") throw new ApiError(400, "Password is required");

  
  const user = await User.findOne({
    $or: [
      {
        userName: emailOrUsername
      },
      {
        email: emailOrUsername
      }
    ] 
  });
  
  if (!user) throw new ApiError(400, "User not found");
  
  if (! await user.isCorrectPassword(password)) throw new ApiError(400, "Invalid password");
  
  const loggedInUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(200, loggedInUser, "Logged In successfully")
  )
})

const uploadProfileImage = asyncHandeller( async (req, res) => {
  const profileImageLocalPath = req.file.path;

  if (profileImageLocalPath === '' || profileImageLocalPath === undefined) throw new ApiError(400, 'Profile image is required');

  const cloudinaryImageURL = await uploadOnCloudinary(profileImageLocalPath);

  if (cloudinaryImageURL === '' || cloudinaryImageURL === undefined) throw new ApiError(400, 'Error uploading profile image');

  return res.status(200).json(
    new ApiResponse(200, cloudinaryImageURL.public_id, "Profile image uploaded successfully")
  );
});

const uploadProfileBanner = asyncHandeller( async (req, res) => {
  const profileBannerLocalPath = req.file.path;

  if (profileBannerLocalPath === '' || profileBannerLocalPath === undefined) throw new ApiError(400, 'Profile banner is required');

  const cloudinaryImageURL = await uploadOnCloudinary(profileBannerLocalPath);

  if (cloudinaryImageURL === '' || cloudinaryImageURL === undefined) throw new ApiError(400, 'Error uploading profile banner');

  return res.status(200).json(
    new ApiResponse(200, cloudinaryImageURL.public_id, "Profile banner uploaded successfully")
  );
});

const addToWatchLater = asyncHandeller( async (req, res) => {
  const { userId, videoId } = req.body;

  if (videoId === undefined || videoId === '') throw new ApiError(400, 'Video not found');

  var user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const watchLaterPlaylist = user.playlists.find(playlist => playlist.name === 'Watch Later');
  
  if (!watchLaterPlaylist) user = await user.createPlaylist('Watch Later');

  const userAfterAdding = user.addVideoToPlaylist('Watch Later', videoId);

  const finalUser = await User.findById(userId).select('-password');

  return res.status(200).json(
    new ApiResponse(200, { user: finalUser })
  );
});

const saveToPlaylist = asyncHandeller( async (req, res) => {
  const { userId, playlistId, videoId } = req.body;

  if (videoId === undefined || videoId === '') throw new ApiError(400, 'Video is required');
  if (playlistId === undefined || playlistId === '') throw new ApiError(400, 'Playlist is required');
  if (userId === undefined || userId === '') throw new ApiError(400, 'User is required');

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const userAfterSaving = await User.addVideoToPlaylist(playlistId, videoId);

  const finalUser = await User.findById(userAfterSaving).select('-password');

  return res.status(200).json(
    new ApiResponse(200, finalUser)
  );
});

const deleteFromPlaylist = asyncHandeller( async (req, res) => {
  const { userId, playlistId, videoId } = req.body;

  if (videoId === undefined || videoId === '') throw new ApiError(400, 'Video is required');
  if (playlistId === undefined || playlistId === '') throw new ApiError(400, 'Playlist is required');
  if (userId === undefined || userId === '') throw new ApiError(400, 'User is required');

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const userAfterSaving = await User.deleteVideoFromPlaylist(playlistId, videoId);

  const finalUser = await User.findById(userAfterSaving).select('-password');

  return res.status(200).json(
    new ApiResponse(200, finalUser)
  );
});

const getUserHistory = asyncHandeller( async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const userHistory = user.watchHistory;

  const videos = await Video.find({ _id: { $in: userHistory } });
  var owners = await User.find({ _id: { $in: videos.map(video => video.owner) } });
  owners = videos.map(video => owners.find(owner => owner._id.equals(video.owner)));

  var finalVideos = [];
  for (let i = videos.length - 1; i >= 0; i--) {
    if (i === videos.length - 0) videos[i].duration = 560;
    if (i === videos.length - 1) videos[i].duration = 459;
    if (i === videos.length - 2) videos[i].duration = 1268;
    if (i === videos.length - 3) videos[i].duration = 25789;
    if (i === videos.length - 4) videos[i].duration = 592;
    if (i === videos.length - 5) videos[i].duration = 608;
    if (i === videos.length - 6) videos[i].duration = 115;
    
    finalVideos.push({
      _id: videos[i]._id,
      thumbnail: videos[i].thumbnail,
      title: videos[i].title,
      views: videos[i].views,
      duration: calcDuration(videos[i].duration),
      channelName: owners[i].fullName,
      description: videos[i].descripton
    });
  }

  return res.status(200).json(
    new ApiResponse(200, finalVideos, 'User history')
  );
});

const getYouHistory = asyncHandeller( async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const userHistory = user.watchHistory.slice(-16);

  const videos = await Video.find({ _id: { $in: userHistory } });
  var owners = await User.find({ _id: { $in: videos.map(video => video.owner) } });
  owners = videos.map(video => owners.find(owner => owner._id.equals(video.owner)));

  var finalVideos = [];
  for (let i = videos.length - 1; i >= 0; i--) {
    if (i === videos.length - 0) videos[i].duration = 560;
    if (i === videos.length - 1) videos[i].duration = 459;
    if (i === videos.length - 2) videos[i].duration = 1268;
    if (i === videos.length - 3) videos[i].duration = 25789;
    if (i === videos.length - 4) videos[i].duration = 592;
    if (i === videos.length - 5) videos[i].duration = 608;
    if (i === videos.length - 6) videos[i].duration = 115;
    
    finalVideos.push({
      _id: videos[i]._id,
      thumbnail: videos[i].thumbnail,
      title: videos[i].title,
      views: videos[i].views,
      duration: calcDuration(videos[i].duration),
      channelName: owners[i].fullName,
      description: videos[i].descripton
    });
  }

  return res.status(200).json(
    new ApiResponse(200, finalVideos, 'User history')
  );
});

const getChannel = asyncHandeller( async (req, res) => {
  const { channelName } = req.params;

  if (channelName === undefined || channelName === '') throw new ApiError(400, 'channel name is required');

  const channel = await User.find({ userName: channelName }).select("-password");

  if (!channel) throw new ApiError(400, 'Channel not found');

  return res.status(200).json(
    new ApiResponse(200, channel[0], 'Channel fetched successfully')
  );
});

const getSubscriptions = asyncHandeller( async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const subscriptions = user.subscriptions;

  const subscriptionChannels = [];
  for (let i = 0; i < subscriptions.length; i++) {
    subscriptionChannels.push(await User.findById(subscriptions[i]).select('userName fullName profileImage'));
  }

  return res.status(200).json(
    new ApiResponse(200, {subscriptions: subscriptionChannels})
  );
})

module.exports = {
  registerUser,
  loginUser,
  uploadProfileImage,
  uploadProfileBanner,
  addToWatchLater,
  saveToPlaylist,
  deleteFromPlaylist,
  getUserHistory,
  getYouHistory,
  getChannel,
  getSubscriptions
};