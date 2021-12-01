import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename(req, res, cd){
        cd(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({storage});

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) =>{
    res.send(`/${req.file.path}`);
});

export default uploadRouter;