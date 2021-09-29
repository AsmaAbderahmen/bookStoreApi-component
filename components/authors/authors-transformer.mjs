/**
 * this file deal with responses returned to the client side
 */

export default class Transformer{
    constructor(){}
    create(data) {
        return {
            _id: data._id,
            fullname: data.fullname,
            image: data.image
        }
    };
    list(data) {
        var output = [];
        data.forEach(dt => {
            output.push({
                    _id: dt._id,
                    fullname: dt.fullname,
                    image: dt.image
                })
            
        });
        return output
    };

}