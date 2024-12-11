// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Ensure the username is always required
        trim: true,
        minlength: 3 // Optional: minimum length constraint
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
