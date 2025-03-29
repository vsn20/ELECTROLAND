const mongoose = require("mongoose");

let isConnected = false; // Flag to track connection status

const connectmongodb = async () => {
    if (isConnected) {
        console.log("MongoDB already connected");
        return;
    }
    
    try {
        await mongoose.connect("mongodb+srv://vuppalasainaman:LMcCkdsA06cVLl3o@cluster0.q0nzt0i.mongodb.net/electroworld");
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};

module.exports = connectmongodb;
