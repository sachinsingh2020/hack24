import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { google } from "googleapis";
// import apikey from "../apikey.json" assert { type: "json" };
import { UploadFile } from "../models/uploadFileModel.js";
import { Readable } from 'stream';
import { User } from "../models/userModel.js";
import fs from 'fs';

const SCOPE = ['https://www.googleapis.com/auth/drive'];

export const uploadFile = catchAsyncError(async (req, res, next) => {
    const { type } = req.body;
    let user = await User.findById(req.user.id);
    const jwtClient = new google.auth.JWT(
        process.env.APIKEY_CLIENT_EMAIL,
        null,
        process.env.APIKEY_PRIVATE_KEY,
        SCOPE
    );

    try {
        await jwtClient.authorize();
        console.log('Successfully connected!');
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }

    const drive = google.drive({
        version: 'v3',
        auth: jwtClient
    });

    if (!req.file) {
        return next(new ErrorHandler('No file uploaded', 400));
    }

    const fileMetadata = {
        name: req.body.name,
        parents: ['1-gROt-LDAC-pOhibvEaATiVjNq4lhPrF'] // Folder ID
    };


    // Create a readable stream from the file buffer
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null); // Indicate the end of the stream

    const media = {
        mimeType: req.file.mimetype,
        body: bufferStream
    };

    try {
        // Upload the file to Google Drive
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        const fileId = response.data.id;

        const collaborators = [];
        collaborators.push(req.user.id);

        // Save the file metadata in your database
        const fileRecord = await UploadFile.create({
            driveId: fileId,
            name: req.body.name,
            mimeType: req.file.mimetype,
            type: type,
            uploadedBy: req.user.firstName,
            collaborators: collaborators,
            collaboratorsEmail: req.user.email
        });

        // Add the file to the user's list of files
        user.myRepos.push(fileRecord._id);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'File uploaded successfully!',
            fileDriveId: fileRecord.driveId,
            fileRecord
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const getMyRepos = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('myRepos');
    const myRepos = user.myRepos;

    res.status(200).json({
        success: true,
        myRepos
    });
});

export const getAllPublicRepos = catchAsyncError(async (req, res, next) => {
    const publicRepos = await UploadFile.find({ type: 'public' });

    res.status(200).json({
        success: true,
        publicRepos
    });
});

export const getRepoById = catchAsyncError(async (req, res, next) => {
    const repo = await UploadFile.findById(req.params.id);

    if (!repo) {
        return next(new ErrorHandler('File not found', 404));
    }

    res.status(200).json({
        success: true,
        repo
    });
});

export const deleteRepo = catchAsyncError(async (req, res, next) => {
    const repo = await UploadFile.findById(req.params.id);

    if (!repo) {
        return next(new ErrorHandler('File not found', 404));
    }

    const user = await User.findById(req.user.id);

    if (user.myRepos.includes(req.params.id)) {
        user.myRepos = user.myRepos.filter(id => id.toString() !== req.params.id);
        await user.save();
    }

    await UploadFile.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'File deleted successfully'
    });
});

export const likeRepo = catchAsyncError(async (req, res, next) => {
    const repo = await UploadFile.findById(req.params.id);

    if (!repo) {
        return next(new ErrorHandler('File not found', 404));
    }

    const user = await User.findById(req.user.id);

    if (repo.likedBy.includes(req.user.id)) {
        repo.likedBy = repo.likedBy.filter(id => id.toString() !== req.user.id);
        user.myLikes = user.myLikes.filter(id => id.toString() !== req.params.id);
        repo.likeCount -= 1;
    } else {
        repo.likedBy.push(req.user.id);
        user.myLikes.push(req.params.id);
        repo.likeCount += 1;
    }

    await repo.save();

    await user.save();

    res.status(200).json({
        success: true,
        message: 'File liked/unliked successfully',
        repo,
        user
    });
});

export const addCollaborator = catchAsyncError(async (req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    const repo = await UploadFile.findById(req.params.id);

    if (!repo) {
        return next(new ErrorHandler('File not found', 404));
    }

    if (repo.collaborators.includes(user._id)) {
        return next(new ErrorHandler('User is already a collaborator', 400));
    }

    repo.collaborators.push(user._id);
    repo.collaboratorsEmail.push(user.email);

    await repo.save();

    res.status(200).json({
        success: true,
        message: 'Collaborator added successfully',
        repo
    });


});

export const downloadZipFile = catchAsyncError(async (req, res, next) => {
    const repo = await UploadFile.findById(req.params.id);

    if (!repo) {
        return next(new ErrorHandler('File not found', 404));
    }

    const jwtClient = new google.auth.JWT(
        process.env.APIKEY_CLIENT_EMAIL,
        null,
        process.env.APIKEY_PRIVATE_KEY,
        SCOPE
    );

    try {
        await jwtClient.authorize();
        console.log('Successfully connected!');
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }

    const drive = google.drive({
        version: 'v3',
        auth: jwtClient
    });

    const fileId = repo.driveId;

    const dest = fs.createWriteStream(`./${repo.name}.zip`);

    drive.files.get({
        fileId: fileId,
        alt: 'media'
    }, { responseType: 'stream' },
        function (err, res) {
            res.data
                .on('end', () => {
                    console.log('Done');
                })
                .on('error', err => {
                    console.log('Error', err);
                })
                .pipe(dest);
        });

    res.status(200).json({
        success: true,
        message: 'File downloaded successfully',
        repo
    });
});

export const redirectToFileInDrive = catchAsyncError(async (req, res, next) => {
    const repo = await UploadFile.findById(req.params.id);

    if (!repo) {
        return next(new ErrorHandler('File not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Redirecting to file in Google Drive',
        link: `https://drive.google.com/file/d/${repo.driveId}/view`
    });

    // res.redirect(`https://drive.google.com/file/d/${repo.driveId}/view`);
});


