import Repository from './books-repository.mjs';
import Transformer from './books-transformer.mjs';
import { book } from './books-model.mjs';
import { ResponseRender } from '../../app/middlewares/response-render.js';
const transformer = new Transformer();

export var checkExistance = async function (req, res, next) {
    const repo = new Repository();
    let body = req.body
    try {
        let data = await repo.verifyExistance({ name: body.name });
        return res.status(200).json(ResponseRender(200, "success", {
            exist: data
        }))
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }
};

export var getAll = async function (req, res, next) {
    const repo = new Repository();
    let page = Number(req.params.page_number)
    let per_page = Number(req.params.per_page)

    try {
        let data = await repo.getAll({ data: { page: page, per_page: per_page } });
        let count = await repo.getCount();
        return res.status(200).json(ResponseRender(200, success_messages.LIST_FOUND, {
            total_count: count,
            current_page: Number(page),
            total_pages: Math.ceil(count / per_page),
            books: transformer.list(data)
        }))
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }
};

export var create = async function (req, res, next) {
    const repo = new Repository();
    try {
        if (req.file)
            body['image'] = req.file.filename;
        else
            body['image'] = 'book_default_image.png';
        let books = new book(req.body);
        let data = await repo.create(books);
        if (data)
            return res.status(200).json(ResponseRender(200, "success", transformer.create(data)))
        else
            res.status(409).json(ResponseRender(409, 'book is not created'));
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }
};

export var getById = async function (req, res, next) {
    const repo = new Repository();
    try {
        let data = await repo.getById(req.params._id);
        if (data)
            return res.status(200).json(ResponseRender(200, "success", transformer.details(data)))
        else
            res.status(409).json(ResponseRender(409, 'book not found'));
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }
};

export var update = async function (req, res, next) {
    const repo = new Repository();
    try {
        const _id = req.params._id;
        const object = req.body;
        let exists = await repo.verifyExistance({ _id: _id });
        if (exists) {
            if (req.file)
                object['image'] = req.file.filename;
            await repo.update(_id, object);
            let data = await repo.getById(_id)
            return res.status(200).json(ResponseRender(200, "success", transformer.details(data)))
        } else {
            res.status(409).json(ResponseRender(409, 'book not found'))
        }
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }
};

export var delete_one = async function (req, res, next) {
    const repo = new Repository();
    try {
        const _id = req.params._id;
        const object = req.body;
        let exists = await repo.verifyExistance({ _id: _id });
        if (exists) {
            await repo.deleteOne({ _id: _id });
            return res.status(200).json(ResponseRender(200, "book deleted"))
        } else {
            res.status(409).json(ResponseRender(409, 'book not found'))
        }
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }

};
