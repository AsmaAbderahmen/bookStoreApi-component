import Repository from './users-repository.mjs';
import { User } from './users-model.mjs';
import { ResponseRender } from '../../app/middlewares/response-render.js';
import { success_messages } from '../../app/constants/success_messages.js';
import { errors_messages } from '../../app/constants/errors_messages.js';

export var verifyExistance = async function (req, res, next) {
    const repo = new Repository();
    const email = req.body.email
    try {
        let data = await repo.verifyExistance({ email: email });
        return res.status(200).json(ResponseRender(200, "success", { exist: data }))
    } catch (error) {
        return res.status(500).json({
            message: `Unknown Error Occured : ${error.message || error}`
        })
    }
};

export var create = async function (req, res, next) {
    const repo = new Repository();
    try {
        let user = new User(req.body);
        let data = await repo.create(user);
        if (data)
            return res.status(200).json(ResponseRender(200, success_messages.ACCOUNT_CREATED))
        else
            return res.status(409).json(ResponseRender(409, errors_messages.ACCOUNT_NOT_CREATED))
    } catch (error) {
        return res.status(500).json({
            message: `Unknown Error Occured : ${error.message || error}`
        })
    }

};


