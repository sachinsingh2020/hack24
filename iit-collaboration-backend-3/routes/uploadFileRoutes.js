import express from 'express';
import singleUpload from '../middlewares/multer.js';
import { addCollaborator, deleteRepo, downloadZipFile, getAllPublicRepos, getMyRepos, getRepoById, likeRepo, redirectToFileInDrive, uploadFile } from '../controllers/uploadFileController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route("/upload").post(isAuthenticated, singleUpload, uploadFile)

router.route("/getmyrepos").get(isAuthenticated, getMyRepos);

router.route("/getallpublicrepos").get(getAllPublicRepos);

router.route("/getrepo/:id").get(getRepoById);

router.route("/deleterepo/:id").delete(isAuthenticated, deleteRepo);

router.route("/likerepo/:id").put(isAuthenticated, likeRepo);

router.route("/addcollaborator/:id").put(isAuthenticated, addCollaborator);

router.route("/downloadzip/:id").get(isAuthenticated, downloadZipFile);

router.route("/redirect/:id").get(redirectToFileInDrive);

export default router;