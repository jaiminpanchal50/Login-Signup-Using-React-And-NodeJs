const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true,
        // trim: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
