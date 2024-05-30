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

const getUserHistory = asyncHandeller( async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const userHistory = await user.watchHistory;

  var videos = [];
  var video = null;
  var owner = null;
  var duration = 0;
  for (let i = userHistory.length - 1; i >= 0; i--) {
    video = await Video.findById(userHistory[i]);
    owner = await User.findById(video.owner);
    if (i === userHistory.length - 0) duration = 560;
    if (i === userHistory.length - 1) duration = 459;
    if (i === userHistory.length - 2) duration = 1268;
    if (i === userHistory.length - 3) duration = 25789;
    if (i === userHistory.length - 4) duration = 592;
    if (i === userHistory.length - 5) duration = 608;
    if (i === userHistory.length - 6) duration = 115;
    
    videos.push({
      _id: video._id,
      thumbnail: video.thumbnail,
      title: video.title,
      views: video.views,
      duration: calcDuration(duration),
      channelName: owner.fullName,
      description: video.descripton
    });
  }

  return res.status(200).json(
    new ApiResponse(200, videos, 'User history')
  );
});

const getYouHistory = asyncHandeller( async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  
  if (!user) throw new ApiError(400, 'User not found');

  const userHistory = await user.watchHistory.slice(-16);

  var videos = [];
  var video = null;
  var owner = null;
  var duration = 0;
  for (let i = userHistory.length - 1; i >= 0; i--) {
    video = await Video.findById(userHistory[i]);
    owner = await User.findById(video.owner);
    if (i === userHistory.length - 0) duration = 560;
    if (i === userHistory.length - 1) duration = 459;
    if (i === userHistory.length - 2) duration = 1268;
    if (i === userHistory.length - 3) duration = 25789;
    if (i === userHistory.length - 4) duration = 592;
    if (i === userHistory.length - 5) duration = 608;
    if (i === userHistory.length - 6) duration = 115;
    
    videos.push({
      _id: video._id,
      thumbnail: video.thumbnail,
      title: video.title,
      views: video.views,
      duration: calcDuration(duration),
      channelName: owner.fullName,
      description: video.descripton
    });
  }

  return res.status(200).json(
    new ApiResponse(200, videos, 'User history')
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
  subscribe,
  unsubscribe,
  getUserHistory,
  getYouHistory,
  getChannel,
  getSubscriptions
};