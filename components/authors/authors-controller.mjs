import Repository from './authors-repository.mjs';
import Transformer from './authors-transformer.mjs';
import {author} from './authors-model.mjs';
import {ResponseRender} from'../../app/middlewares/response-render.js';
const transformer = new Transformer();


export var getAll = async function(req, res, next)  {
        const repo = new Repository();
        try {
            let data = await repo.getAll();
            return res.json(data)
        } catch (error) {
            return res.status(500).json({
                message: `Unknown Error Occured : ${error.message || error}`
            })
        }
    };

export var create = async function (req, res, next) {
        const repo = new Repository();
        try {
            let authors = new author(req.body);
            let data = await repo.create(authors);
            return res.json({
                data: transformer.create(data)
            })
        } catch (error) {
            return res.status(500).json({
                message: `Unknown Error Occured : ${error.message || error}`
            })
        }


    };

export var getById = async function (req, res, next) {
        const repo = new Repository();
        try {
            let data = await repo.getById(req.params._id);
            return res.json(data)
        } catch (error) {
            return res.status(500).json({
                message: `Unknown Error Occured : ${error.message || error}`
            })
        }
    };

export var update = async function(req, res, next) {
        const repo = new Repository();
        try {
            const criteria = req.params._id;
            const object = req.body;
            let data = await repo.update(criteria, object);
            return res.json({
                data: transformer.create(data)
            })
        } catch (error) {
            return res.status(500).json({
                message: `Unknown Error Occured : ${error.message || error}`
            })
        }
    };

export var delete_one = async function(req, res, next){
        const repo = new Repository();
        try {
            const criteria = req.params._id;
            let data = await repo.delete(criteria);
            return res.status(200).json({
                status: 200,
                message:"success"
            })
        } catch (error) {
            return res.status(500).json({
                message: `Unknown Error Occured : ${error.message || error}`
            })
        }

};
