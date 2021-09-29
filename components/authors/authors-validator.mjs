/**
 * this file deal with client side requests validation
 */


export default class Validator {
    request={
    
        create(req, res, next) {
            if (!req.body.fullname)
                res.status(400).json({ status: 400, message: "body with no fullname" });
            else
                next()
        },

    };
    response= {
        create (req, res, next) {
            console.warn('implement your response validation here');
            next()
        }
    }
};