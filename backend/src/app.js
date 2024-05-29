const express = require('express');
const cors = require('cors');

const app = express();
console.log('created app');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

console.log('origin set');

app.use(express.json());
console.log('creating router 1');
const userRouter = require('./routes/user.route');
console.log('creating router 2');
const videoRouter = require('./routes/video.route');

console.log('assigning router');
app.use('/api/v1/users', userRouter);
app.use('/api/v1/videos', videoRouter);

console.log('exporting router');
module.exports = app;