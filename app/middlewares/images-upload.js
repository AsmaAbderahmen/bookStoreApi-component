import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


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
export const upload = multer({
    storage: Storage,
    fileFilter: fileFilterFN,
    limits: {_fileSize: 1024 * 1024 * 5}

});





