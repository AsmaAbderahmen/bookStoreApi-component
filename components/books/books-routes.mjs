import  {getAll, checkExistance,create, getById, update, delete_one}  from './books-controller.mjs';
import Validator from "./books-validator.mjs";
import { App } from '../../app/index.js';
import { check_auth } from '../../app/middlewares/check-Auth.js';
import { upload } from '../../app/middlewares/images-upload.js';

const router   = App.getRouter();
const validator = new Validator();



/* getting item by _id */
router.get('/:_id/details',check_auth, getById);

/*check ithe existing of a book */
router.post('/check-existance',check_auth, validator.request.create, checkExistance);


/* getting the list route */
router.get('/:per_page/:page_number',check_auth, getAll);

/* creation route */
router.post('/',check_auth,upload.single('image'), validator.request.create, create);

/* updating route */
router.post('/:_id',check_auth,upload.single('image'), update);

/* deleting route */
router.delete('/:_id',check_auth, delete_one);

export const Router =  router;
