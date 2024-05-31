const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  videoFile: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: Date.now()
  },
  descripton: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  visiblity: {
    type: String,
    default: 'public'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  madeForKids: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
});

videoSchema.methods.addView = async function () {
  this.views += 1;
  await this.save();

  return this;
}

videoSchema.methods.addLike = async function () {
  this.likes += 1;
  await this.save();
  return this;
}

videoSchema.methods.remLike = async function () {
  this.likes -= 1;
  await this.save();
  return this;
}

videoSchema.methods.addDislike = async function () {
  this.dislikes += 1;
  await this.save();
  return this;
}

videoSchema.methods.remDislike = async function () {
  this.dislikes -= 1;
  await this.save();
  return this;
}

videoSchema.methods.addComment = async function (commentId) {
  this.comments.push(commentId);
  await this.save();
  return this;
}

videoSchema.methods.deleteComment = async function (commentId) {
  this.comments = this.comments.filter(comment => comment!= commentId);
  await this.save();
  return this;
}

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;