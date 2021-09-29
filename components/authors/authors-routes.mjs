import  {getAll,create,checkExistance}  from './authors-controller.mjs';
import Validator from "./authors-validator.mjs";
import { check_auth } from '../../app/middlewares/check-Auth.js';
import { upload } from '../../app/middlewares/images-upload.js';
import { App } from '../../app/index.js';
const router   = App.getRouter();
const validator = new Validator();

/* getting the list route */
router.get('/:page_number/:per_page',check_auth ,getAll);

/* getting item by _id */
router.post('/check-existance', check_auth, validator.request.create ,checkExistance);

/* creation route */
router.post('/', check_auth, upload.single('image') , validator.request.create, create);

export const Router =  router;
