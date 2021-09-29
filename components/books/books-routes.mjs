import express from 'express';

import  {getAll,create, getById, update, delete_one}  from './books-controller.mjs';
import Validator from "./books-validator.mjs";
import { createRequire } from 'module';
import { App } from '../../app/index.js';
const router   = App.getRouter();
const validator = new Validator();



/* getting the list route */
router.get('/', getAll);

/* getting item by _id */
router.get('/:_id', getById);

/* creation route */
router.post('/', validator.request.create, create, validator.response.create);

/* updating route */
router.post('/:_id', update);

/* deleting route */
router.delete('/:_id', delete_one);


export const Router =  router;
