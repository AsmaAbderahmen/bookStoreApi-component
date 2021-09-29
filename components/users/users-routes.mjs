import {  create, verifyExistance } from './users-controller.mjs';
import Validator from "./users-validator.mjs";
import { App } from '../../app/index.js';
const router = App.getRouter();
const validator = new Validator();


/* verify if a user email does exist on th db */
router.post('/check-existance', validator.request.create, verifyExistance);

/* creation route */
router.post('/', validator.request.create, create);



export const Router = router;
