/**
 * this file deal with responses returned to the client side
 */

export default class Transformer{
    constructor(){}
    create(data) {
        var output = [];
        data.forEach(dt => {
            output.push(dt)
        });
        return output
    };
    list(data) {
        var output = [];
        data.forEach(dt => {
            output.push(dt)
        });
        return output
    };

}