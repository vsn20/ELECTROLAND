const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://vuppalasainaman:LMcCkdsA06cVLl3o@cluster0.q0nzt0i.mongodb.net/electroworld', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fail faster if connection isn’t possible
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit if connection fails
  }
}

module.exports = connectToMongoDB;
    
