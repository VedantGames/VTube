const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN2,
  credentials: true
}))


app.use(express.json());
const userRouter = require('./routes/user.route');
const videoRouter = require('./routes/video.route');
const commentRouter = require('./routes/Comment.route');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/comments', commentRouter);

module.exports = app;