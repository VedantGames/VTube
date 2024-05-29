console.log("starting");
require('dotenv').config();
console.log("dotenv configged");

const connectDB = require('./src/db/index');
const app = require('./src/app');
console.log('connecting');

connectDB().then(() => {
  console.log('connected');
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on port ' + process.env.PORT || 8000);
  })
}).catch(err => {
  console.log(err);
})