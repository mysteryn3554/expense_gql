import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male","female"],
        required: true,
    },
    },{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

