import multer from 'multer';
import dotenv from 'dotenv';
import "dotenv/config.js";


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();

const Storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null,__dirname+"/images/");
        },
        filename: function (eq, file, cb) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname.replace(/\s/g,''));
        }
    });
let fileFilterFN = function (req, file, cb) {

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|svg)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    else {
        cb(null, true)
    }
};
export const upload_images = multer({
    storage: Storage,
    fileFilter: fileFilterFN,
    limits: {_fileSize: 1024 * 1024 * 5}

});





