require('dotenv').config();

const connectDB = require('./src/db/index');
const app = require('./src/app');

connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on port ' + process.env.PORT || 8000);
  })
}).catch(err => {
  console.log(err);
})