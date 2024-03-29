import User from "../models/user";
import catchAsyncErrors from "../middlewares/catchAsynsErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";

import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";

// Setting up cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register user => /api/auth/regiter
const registerUser = catchAsyncErrors(async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "bookit/avatars",
        width: "150",
        crop: "scale",
    });

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "Account registered successfully",
    });
});

// Current User Profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Profile => /api/me/update
const updateProfile = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.body.password) user.password = req.body.password;
    }

    // Update avatar
    if (req.body.avatar !== "") {
        const image_id = user.avatar.public_id;

        // Delete user previous image/avatar
        await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "bookit/avatars",
            width: "150",
            crop: "scale",
        });

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    await user.save();

    res.status(200).json({
        success: true,
    });
});

// Forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found with this e-mail", 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Get origin
    const { origin } = absoluteUrl(req);

    // Create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n
    If you have not requested this email, then ignore the email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "BookIT Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

export { registerUser, currentUserProfile, updateProfile, forgotPassword };
