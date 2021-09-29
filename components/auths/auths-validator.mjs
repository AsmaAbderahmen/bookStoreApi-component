import { validate_email } from "../../app/middlewares/global-functions.mjs";
export default class Validator {
    request = {
        signin(req, res, next) {
            if (!req.body.email || !validate_email(req.body.email) || !req.body.password)
                res.status(400).json({ status: 400, message: "body with no email, password or incorrect email format" });
            else
                next()
        },
        refresh_token(req, res, next) {
            if (!req.body.refresh_token)
                res.status(400).json({ status: 400, message: "body with no refresh_token" });
            else
                next()
        },
        change_password(req, res, next) {
            if (!req.body.old_password || !req.body.new_password)
                res.status(400).json({ status: 400, message: "body with no either the new password or the old password" });
            else
                next()
        },
        forget_password_send_email(req, res, next) {
            if (!req.body.email || !validate_email(req.body.email))
                res.status(400).json({ status: 400, message: "body with no email or incorrect email format" });
            else
                next()
        },
        forget_password_verify_code(req, res, next) {
            if (!req.body.email || !validate_email(req.body.email || !req.body.code))
                res.status(400).json({ status: 400, message: "body with no email, no code or incorrect email format" });
            else
                next()
        },

    };
    response = {
        create(req, res, next) {
            console.warn('implement your response validation here');
            next()
        }
    }
};