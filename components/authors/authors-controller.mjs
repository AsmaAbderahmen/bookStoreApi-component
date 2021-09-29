import Repository from './authors-repository.mjs';
import Transformer from './authors-transformer.mjs';
import { author } from './authors-model.mjs';
import { ResponseRender } from '../../app/middlewares/response-render.js';
import { success_messages } from '../../app/constants/success_messages.js';
const transformer = new Transformer();

export var checkExistance = async function (req, res, next) {
    const repo = new Repository();
    try {
        let data = await repo.getOne({ fullname: req.body.fullname });
        return res.status(200).json(ResponseRender(200, "success", {
            exist: data ? true : false
        }))
    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};

export var create = async function (req, res, next) {
    const repo = new Repository();
    try {
        if (req.file)
            body['image'] = req.file.filename;
        else
            body['image'] = 'author_default_image.png';
        let authors = new author(req.body);
        let data = await repo.create(authors);
        return res.status(200).json(ResponseRender(200, "success", transformer.create(data)))
    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};

export var getAll = async function (req, res, next) {
    const repo = new Repository();
    let page = req.params.page_number
    let per_page = req.params.per_page
    try {

        let data = await repo.getAll({ data: { page: page, per_page: per_page } });
        let count = await repo.getCount();
        return res.status(200).json(ResponseRender(200, success_messages.LIST_FOUND, {
            total_count: count,
            current_page: Number(page),
            total_pages: Math.ceil(count / per_page),
            authors: transformer.list(data)
        }))
    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};




