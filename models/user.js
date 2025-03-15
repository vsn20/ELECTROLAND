const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String,  required: true } // Added type field
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
