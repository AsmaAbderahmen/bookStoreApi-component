import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import moment from 'moment'

/*
* get environnement variables
* */


import User_Repository from '../users/users-repository.mjs';
import Transformer from './auths-transformer.mjs';
import {User} from '../users/users-model.mjs'
import {ResponseRender} from "../../app/middlewares/response-render.js";
import {errors_messages} from "../../app/constants/errors_messages.js";
import {success_messages} from "../../app/constants/success_messages.js";

import {send_mail} from "../../app/middlewares/emailing.mjs";

import {forget_password_email_template} from "../../app/views/forget_password_template.js";

const token_key = String(process.env.TOKEN_SECRET_KEY);
const refresh_token_key = String(process.env.REFRESH_SECRET_KEY);
const token_life = process.env.TOKEN_LIFE || '1h';
const refresh_token_life = process.env.REFRESH_LIFE || '1d';
const token_nbf = process.env.TOKEN_NBF || 500;
const transformer = new Transformer();

let hash_password = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash)
            });
        });
    });
};

function generate_codes() {
    let code = "";
    do {
        code += crypto.randomBytes(3).readUIntBE(0, 3);
        // code += Number.parseInt(randomBytes(3).toString("hex"), 16);
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
    let repo = new Repository();
    let body = req.body;
    try {
        let refresh_token = body.refresh_token;
        await   jwt.verify(refresh_token, refresh_token_key, async (err, decoded) => {
            if (err)
                return res.status(401).send(ResponseRender(401, errors_messages.CLINET_REFRESH_EXPIRED));
            else {
                const user_data = decoded;
                const token_data = {_id: user_data._id, email: user_data.email};
                const token = await generate_token(token_data);
                res.status(200).json(ResponseRender(200, "success", transformer.refresh_token(token)))
            }
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR));
    }
};

export var signin = async (req, res, next) => {
    const user_repo = new User_Repository();
    const body = req.body;
    try {
        let verification_data = {email: body.email.toLowerCase()};
            let user = await user_repo.get_user(verification_data);
          if(user){
                    try {
                        await   bcrypt.compare(body.password, user.password, async (err, result) => {
                            if (result) {
                                let token_data = {_id: user._id, role_name: user.role_name};
                                let token = await generate_token(token_data);
                                let refresh_token = await refresh_token_function(token_data);
                                let result_object = {user: user, token: token, refresh_token: refresh_token};
                                return res.status(200).json(ResponseRender(200, success_messages.SUCCESS_LOGIN, transformer.signin(result_object)))
                            } else {
                                return res.status(406).json(ResponseRender(406, errors_messages.WRONG_CREDENTIELS));
                            }
                        });
                    } catch (error) {
                        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
                    }
               
        } else {
            return res.status(406).json(ResponseRender(406, errors_messages.WRONG_CREDENTIELS, []));
        }
    } catch (error) {
        console.error('err', error);
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR))
    }

};


export var change_password = async (req, res, next) => {
    const user_repo = new User_Repository();
    const _id = req.user_data._id;
    const new_password = req.body.new_password;
    const old_password = req.body.old_password;
    try {
            let user_data = await user_repo.get_user({_id: _id});
            await bcrypt.compare(old_password, user_data.password, async (err, result) => {
                if (result) {
                    if (old_password == new_password) {
                        return res.status(409).json(ResponseRender( 409, "using same old password"));
                    } else {
                        await user_repo.update({ filter_obj:{_id: _id }, updating_obj: { password: await hash_password(new_password)} });
                        return res.status(200).json(ResponseRender( 200, "password updated"));
                    }
                } else {
                    return res.status(406).json(ResponseRender( 406, "wrong old password"));
                }
            });
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, message: "server error" });
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
                await user_repo.update({filter_obj:{ _id: user_data._id },updating_obj: {
                    password_recovering: {
                        expiration_date: new Date().getTime() + (5 * 60000), //the code will be availble for 5 min
                        code: random
                    }
                }});
                await emailing.send_mail({
                    email: body.email,
                    subject: 'Password Recovering',
                    html: await forget_password_email_template({ username: user_data.username, code: random })
                });
                return res.status(200).json(ResponseRender( 200, "email sent"));
            
            } else {
                return res.status(406).json(ResponseRender( 406, "wrong credentials"));
            }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'server error' })
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
                        return res.status(200).json(ResponseRender( 200, "valid code"));
                    } else {
                        return res.status(408).json(ResponseRender( 408, "expired code"));
                    }
                } else {
                    return res.status(409).json(ResponseRender( 409, "expired code"));
                }
            } else {
                return res.status(406).json(ResponseRender( 406, "wrong credentials"));
            
            }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: 'server error' })
    }
};

export var change_password_on_recovering = async function (req, res, next) {
    const user_repo = new User_Repository();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    try {
       
            let user = await user_repo.get_user({ email: email });
            if (user) {
                await user_repo.update({filter_obj:{ email: email }, updating_obj:{ password: await hash_password(password) }});
                return res.status(200).json(ResponseRender( 200, "password updated"));
            } else {
                return res.status(406).json(ResponseRender( 406, "user not found"));
            }
        
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' });
    }
};





export var forget_password_verify_link = async (req, res, next) => {
    /*
    * forget_password_verify_link:
    *    used to verify the availibility of the forget password link
    * */
    const repo = new Repository();
    const user_repo = new User_Repository();
    try {
        /*
        * params:{
        *      _id : the id of the user
        * }
        * */
        const params = req.params;
        const today = new Date();
        let user_data = await user_repo.get_user_by_id(params._id);
        if (user_data) {
            let expiration_time = user_data.password_recovery.expiration_time;
            if (expiration_time >= today.getTime())
                res.status(200).json(ResponseRender(200, success_messages.LINK_IS_VALID, []));
            else
                res.status(409).json(ResponseRender(409, errors_messages.EXPIRED_LINK, []))
        } else {
            res.status(406).json(ResponseRender(406, errors_messages.ACCOUNT_NOT_FOUND, []))
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR, []))
    }


};

export var candidat_login = async (req, res, next) => {
    /*
    * steps :
    * 1- verify existance
    * 2-check credentials
    * 3- check email_verified
    * 4-check account status
    * */
    const repo = new Repository();
    const body = req.body;
    try {
        /*
             * Steps:
             * 1-verify existance()
             * 2-check the "account status"
             * 3-check password()
             * 4- return data and tokens
             * */
        let verification_data = {email: body.email.toLowerCase(), role_name: 'candidat'};
        let account_verified = await repo.verify_existance(verification_data);
        if (account_verified) {
            let user = await repo.get_user_by_email(verification_data, ['email_verified', '_id', 'role_name', 'password', 'role', 'account_status']);
            console.log('userrrr', user)
            if (user.email_verified) {
                if (user.account_status==0) {

                    try {
                        await   bcrypt.compare(body.password, user.password, async (err, result) => {
                            if (result) {
                                let token_data = {_id: user._id, role_name: user.role_name};
                                let token = await generate_token(token_data);
                                let refresh_token = await refresh_token_function(token_data);
                                let result_object = {user: user, token: token, refresh_token: refresh_token};
                                return res.status(200).json(ResponseRender(200, success_messages.SUCCESS_LOGIN, transformer.admin_login(result_object)))
                            } else {
                                return res.status(406).json(ResponseRender(406, errors_messages.WRONG_CREDENTIELS, []));
                            }
                        });
                    } catch (error) {
                        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR, []))
                    }
                } else {
                    return res.status(409).json(ResponseRender(409, errors_messages.DEACTIVATED_ACCOUNT, []));
                }
            } else {
                return res.status(408).json(ResponseRender(408, errors_messages.NOT_CONFIRMED_ACCOUNT, []));
            }
        } else {
            return res.status(406).json(ResponseRender(406, errors_messages.WRONG_CREDENTIELS, []));
        }
    } catch (e) {
        console.log('err', e);
        return res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR, []))
    }

};
export var forget_password_send_email_candidat = async (req, res, next) => {
    /*
    * steps:
    * -verify the existance of the uses
    * -send an email containg the link with user is and password recovering _id
    * -update the user's document by adding a recovering password new item with new expiration date
    *
    *
    * */
    const repo = new Repository();
    const body = req.body;
    const lang = req.params.lang;
    try {
        let verif_obj = {
            email: body.email.toLowerCase(),
            role_name: 'candidat' //role_name is needed for an exact verification of user's existance
        };
        let user_exists = await repo.verify_existance(verif_obj);
        console.log('user_exists', user_exists);
        if (user_exists) {
            const user_data = await repo.get_user_by_email(verif_obj, ['email_verified', 'first_name', 'account_status']);//(await repo.get_user_by_email(search_user_obj));
            if (user_data.email_verified) {
                if (user_data.account_status ==0) {
                    const updated_user = await repo.update(verif_obj, {password_recovery: {expiration_time: new Date().getTime() + (15 * 60000)}}); //the link will be availble for 15 min
                    console.log('user_data', user_data);
                    const forget_password_link = (global.candidat_forget_pswd_link + user_data._id).replace(/\s/g, '');
                    const send_email_data = {
                        lang: lang ? lang : 'en',
                        first_name: user_data.first_name,
                        link: forget_password_link,
                    };
                    await send_mail({
                        email: body.email,
                        subject: lang ? lang == 'fr' ? "JobGate verification compte" : "JobGate account verification" : "JobGate account verification",
                        html: forget_password_candidat_email_template(send_email_data)
                    });
                    res.status(200).json(ResponseRender(200, success_messages.EMAIL_SENT, [user_data, forget_password_link]))
                } else {
                    return res.status(409).json(ResponseRender(409, errors_messages.DEACTIVATED_ACCOUNT, []));
                }
            } else {
                return res.status(408).json(ResponseRender(408, errors_messages.NOT_CONFIRMED_ACCOUNT, []));
            }
        } else {
            res.status(406).json(ResponseRender(406, errors_messages.ACCOUNT_NOT_FOUND, []))
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR, []))
    }


};

export var forget_password_send_email_trainer = async (req, res, next) => {
    /*
    * steps:
    *- verify the existance of the uses
    *-send an email containg the link with user is and password recovering _id
    * -update the user's document by adding a recovering password new item with new expiration date
    * */
    const repo = new Repository();
    const body = req.body;
    const lang = req.params.lang;
    try {
        let verif_obj = {
            email: body.email.toLowerCase(),
            role_name: 'trainer' //role_name is needed for an exact verification of user's existance
        };
        let user_exists = await repo.verify_existance(verif_obj);
        if (user_exists) {
            const search_user_obj = {email: body.email, role_name: 'trainer'};
            const updated_user = await repo.update(search_user_obj, {password_recovery: {expiration_time: new Date().getTime() + (15 * 60000)}}); //the link will be availble for 15 min
            const user_data = await repo.get_user_by_email(search_user_obj, ['email_verified', '_id', 'first_name', 'password', 'account_status']) //(await repo.get_user_by_email(search_user_obj));
            const forget_password_link = (global.trainer_forget_pswd_link + user_data._id).replace(/\s/g, '');
            const send_email_data = {
                lang: lang ? lang : 'en',
                first_name: user_data.first_name,
                link: forget_password_link,
            };
            await send_mail({
                email: body.email,
                subject: lang ? lang == 'fr' ? "Changement mot de passe" : "Reset password" : "Reset password",
                html: forget_password_trainer_email_template(send_email_data)
            });
            res.status(200).json(ResponseRender(200, success_messages.EMAIL_SENT, [user_data, forget_password_link]))
        } else {
            res.status(406).json(ResponseRender(406, errors_messages.ACCOUNT_NOT_FOUND, []))
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(ResponseRender(500, errors_messages.SERVER_ERROR, []))
    }


};

export {refresh_token_function}