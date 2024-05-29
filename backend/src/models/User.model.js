// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  userName: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true
  },
  fullName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  bannerImage: {
    type: String
  },
  videos: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Video'
    }
  ],
  subscribers: {
    type: Number,
    default: 0
  },
  subscriptions: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  bio: {
    type: String
  },
  watchHistory: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Video'
    }
  ],
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  //this.password = await bcrypt.hash(this.password, 10)
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  // return await bcrypt.compare(password, this.password);
  return this.password === password;
};

userSchema.methods.addVideo = async function (videoURL) {
  this.videos.push(videoURL);
  await this.save();
  return this;
};

userSchema.methods.watchVideo = async function (videoId) {
  if (this.watchHistory[this.watchHistory.length-1] != videoId) {
    this.watchHistory.push(videoId);
    await this.save();
  }
  return this;
}

userSchema.methods.subscribe = async function (channelId) {
  this.subscriptions.push(channelId);
  await this.save();
  return this;
}

userSchema.methods.unsubscribe = async function (channelId) {
  this.subscriptions = this.subscriptions.filter(subscription => subscription != channelId);
  await this.save();
  return this;
}

userSchema.methods.addSubscriber = async function () {
  this.subscribers += 1;
  await this.save();
  return this;
}

userSchema.methods.remSubscriber = async function () {
  this.subscribers -= 1;
  await this.save();
  return this;
}

const User = mongoose.model('User', userSchema);

module.exports = User;