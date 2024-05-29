const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Connecting to MongoDB...');
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully !! DB Host ' + connectionInstance.connection.host)
  } catch (err) {
    console.log('MongoDB connection failed ' + err);
    process.exit(1);
  }
}

module.exports = connectDB;