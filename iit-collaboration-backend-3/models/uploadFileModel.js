import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    driveId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    likeCount: {
        type: Number,
        default: 0,
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    collaboratorsEmail: [
        {
            type: String,

        }
    ],
    uploadedBy: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export const UploadFile = mongoose.model("UploadFile", schema);