/**
 * this file deal with client side requests validation
 */


export default class Validator {
    request={
        create (req, res, next) {
            console.warn('implement your request validation here');
            next()
        },
        get_by_id (req, res, next) {
            console.warn('implement your request validation here');
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