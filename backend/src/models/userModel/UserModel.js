import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        mobileNumber: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            default: false,
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
