/**
 * this file deal with client side requests validation
 */
import { validate_email } from "../../app/middlewares/global-functions.mjs";

export default class Validator {
    request = {
        create(req, res, next) {
            if (!req.body.email || !validate_email(req.body.email))
                res.status(400).json({ status: 400, message: "body with no email or incorrect email format" });
            else
                next()
        },
    }
};