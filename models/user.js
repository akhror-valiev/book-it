import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please eneter your name"],
        maxLength: [50, "Your name cannot exceed 50 characters"]

    },
    email: {
        type: String,
        required: [true, "Please enter your emial"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"]

    },
    password: {
        type: String,
        required: [true, "Please eneter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            requred: true
        },
        url: {
            type: String,
            requred: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

export default mongoose.models.User || mongoose.model("User", userSchema)

