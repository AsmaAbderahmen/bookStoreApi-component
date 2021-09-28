import jwt from 'jsonwebtoken';

const token_life = process.env.TOKEN_LIFE;
const secret_key = process.env.TOKEN_SECRET_KEY;


export var check_auth = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token)
            return res.status(403).send({
                auth: "failed",
                message: 'No token provided'
            });

        jwt.verify(token, secret_key, function (err, decoded) {
            if (err){
                return res.status(401).send({
                    auth: "failed",
                    message: 'expired token'
                });}
            req.user_data = decoded;
            next();
        });
    } catch (err) {
        return res.status(401).json({
            auth: "failed",
            message: 'Auth failed'
        })
    }
};
