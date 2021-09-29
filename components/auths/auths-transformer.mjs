/**
 * this file deal with responses returned to the client side
 */

 export default class Transformer {
    constructor() {
    };
    refresh_token(data) {
        return {token: data}
    };

     signin(data) {
        let user = data.user;
        return{
             _id: user._id,
             email: user.email,
             token: data.token,
             refresh_token: data.refresh_token
        }
    };
   
}