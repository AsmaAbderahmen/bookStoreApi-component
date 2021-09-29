import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import User_Repository from '../users/users-repository.mjs';
import Transformer from './auths-transformer.mjs';

import { hash_password } from "../../app/middlewares/global-functions.mjs";
import { ResponseRender } from "../../app/middlewares/response-render.js";
import { errors_messages } from "../../app/constants/errors_messages.js";
import { success_messages } from "../../app/constants/success_messages.js";
import { send_mail } from "../../app/middlewares/emailing.mjs";
import { forget_password_email_template } from "../../app/views/forget_password_template.js";

const token_key = String(process.env.TOKEN_SECRET_KEY);
const refresh_token_key = String(process.env.REFRESH_SECRET_KEY);
const token_life = process.env.TOKEN_LIFE || '1h';
const refresh_token_life = process.env.REFRESH_LIFE || '1d';
const token_nbf = process.env.TOKEN_NBF || 500;
const transformer = new Transformer();


function generate_codes() {
    let code = "";
    do {
        code += crypto.randomBytes(3).readUIntBE(0, 3);
    } while (code.length < 5);

    return code.slice(0, 5);
}

let generate_token = async (data) => {
    /*
     * data:{
     *    _id: user's object id,
     *    email: users's email,
     *   }
     */
    let token = jwt.sign({
        _id: data._id,
        email: data.email,
        nbf: Number(token_nbf),
        auth: "authorization",
        sub: data._id,
        algorithm: "RS256"
    },
        token_key.toString(),
        { expiresIn: token_life });

    return token

};


let refresh_token_function = async (data) => {
    /*
     * data:{
     *    _id: user's object id,
     *    email: users's email,
     *   }
     */
    let refresh_token = jwt.sign({
        _id: data._id,
        email: data.email,
        nbf: Number(token_nbf),
        auth: "authorization",
        sub: data._id,
        algorithm: "RS256"
    },
        refresh_token_key.toString(), {
        expiresIn: refresh_token_life
    });
    return refresh_token
};

export var refresh_token = async (req, res, next) => {
    let body = req.body;
    try {
        let refresh_token = body.refresh_token;
        await jwt.verify(refresh_token, refresh_token_key, async (err, decoded) => {
            if (err)
                return res.status(401).send(ResponseRender(401, errors_messages.CLINET_REFRESH_EXPIRED));
            else {
                const user_data = decoded;
                const token_data = { _id: user_data._id, email: user_data.email };
                const token = await generate_token(token_data);
                res.status(200).json(ResponseRender(200, "success", transformer.refresh_token(token)))
            }
        });
    } catch (error) {
        return res.status(500).json(ResponseRender(500, "internal server error"))
    }
};

export var signin = async (req, res, next) => {
    const user_repo = new User_Repository();
    const body = req.body;
    try {
        let verification_data = { email: body.email.toLowerCase() };
        let user = await user_repo.get_user(verification_data);
        console.log('user', user)
        if (user) {
            try {
                await bcrypt.compare(body.password, user.password, async (err, result) => {
                    if (result) {
                        let token_data = { _id: user._id, role_name: user.role_name };
                        let token = await generate_token(token_data);
                        let refresh_token = await refresh_token_function(token_data);
                        let result_object = { user: user, token: token, refresh_token: refresh_token };
                        return res.status(200).json(ResponseRender(200, success_messages.SUCCESS_LOGIN, transformer.signin(result_object)))
                    } else {
                        return res.status(406).json(ResponseRender(406, errors_messages.WRONG_CREDENTIELS));
                    }
                });
            } catch (error) {
                return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
            }

        } else {
            return res.status(406).json(ResponseRender(406, errors_messages.WRONG_CREDENTIELS));
        }
    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }

};

export var change_password = async (req, res, next) => {
    const user_repo = new User_Repository();
    const _id = req.user_data._id;
    const new_password = req.body.new_password;
    const old_password = req.body.old_password;
    try {
        let user_data = await user_repo.get_user({ _id: _id });
        await bcrypt.compare(old_password, user_data.password, async (err, result) => {
            if (result) {
                if (old_password == new_password) {
                    return res.status(409).json(ResponseRender(409, "using same old password"));
                } else {
                    await user_repo.update({ filter_obj: { _id: _id }, updating_obj: { password: await hash_password(new_password) } });
                    return res.status(200).json(ResponseRender(200, "password updated"));
                }
            } else {
                return res.status(406).json(ResponseRender(406, "wrong old password"));
            }
        });

    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};


export var forget_password_send_email = async (req, res, next) => {
    const user_repo = new User_Repository();
    const body = req.body;
    const random = await generate_codes();
    try {
        let verif_obj = {
            email: body.email.toLowerCase()
        };
        let user_data = await user_repo.get_user(verif_obj);
        if (user_data) {
            await user_repo.update({
                filter_obj: { _id: user_data._id }, updating_obj: {
                    password_recovering: {
                        expiration_date: new Date().getTime() + (5 * 60000), //the code will be availble for 5 min
                        code: random
                    }
                }
            });
            await send_mail({
                email: body.email,
                subject: 'Password Recovering',
                html: await forget_password_email_template({ username: user_data.username, code: random })
            });
            return res.status(200).json(ResponseRender(200, "email sent"));

        } else {
            return res.status(406).json(ResponseRender(406, "wrong credentials"));
        }

    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};

export var forget_password_verify_code = async (req, res, next) => {
    const user_repo = new User_Repository();
    const body = req.body;
    const today = new Date();
    try {
        let user_data = await user_repo.get_user({ email: body.email.toLowerCase() });
        if (user_data) {
            let expiration_time = user_data.password_recovering.expiration_date.getTime();
            if (expiration_time >= today.getTime()) {
                if (user_data.password_recovering.code == body.code) {
                    return res.status(200).json(ResponseRender(200, "valid code"));
                } else {
                    return res.status(408).json(ResponseRender(408, "expired code"));
                }
            } else {
                return res.status(409).json(ResponseRender(409, "expired code"));
            }
        } else {
            return res.status(406).json(ResponseRender(406, "wrong credentials"));

        }

    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};

export var change_password_on_recovering = async function (req, res, next) {
    const user_repo = new User_Repository();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    try {

        let user = await user_repo.get_user({ email: email });
        if (user) {
            await user_repo.update({ filter_obj: { email: email }, updating_obj: { password: await hash_password(password) } });
            return res.status(200).json(ResponseRender(200, "password updated"));
        } else {
            return res.status(406).json(ResponseRender(406, "user not found"));
        }

    } catch (error) {
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }
};



export { refresh_token_function }