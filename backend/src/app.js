const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json());

const userRouter = require('./routes/user.route');
const videoRouter = require('./routes/video.route');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/videos', videoRouter);

module.exports = app;