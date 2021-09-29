/**
 * this file deal with responses returned to the client side
 */

export default class Transformer {
    constructor() { }
    create(data) {
        return {
            _id: data._id,
            name: data.name,
            price: data.price,
            pages: data.pages,
            author: data.author
        }
    };
    list(data) {
        var output = [];
        data.forEach(dt => {
            output.push({
                _id: dt._id,
                name: dt.name,
                price: dt.price,
                pages: dt.pages,
                author: {
                    _id: dt.author._id,
                    fullname: dt.author.fullname,
                    biography: dt.author.biography,
                    image: dt.author.image
                }
            })
        });
        return output
    };
    details(dt) {
    return {
                _id: dt._id,
                name: dt.name,
                price: dt.price,
                pages: dt.pages,
                author: {
                    _id: dt.author._id,
                    fullname: dt.author.fullname,
                    biography: dt.author.biography,
                    image: dt.author.image
                }
            }
    };
}