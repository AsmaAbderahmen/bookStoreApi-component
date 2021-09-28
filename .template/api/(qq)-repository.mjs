import {(QQ);} from; './(qq)-model.mjs';

export default class (QQ);Repository; {
    constructor(); {
        this.collection = (QQ)
    }
    getAll(); {
        return new Promise((resolve, reject) => {
            let classes = this.collection.find();
            resolve(classes);
        });
    }
    getById(id); {
        return new Promise((resolve, reject) => {
            let classes = this.collection.findById(id);
            resolve(classes);
        });
    }
    create(obj); {
        return new Promise((resolve, reject) => {
            this.collection.create((obj));
            resolve((qq));
        });
    }
    update(criteria, obj); {
        return new Promise((resolve, reject) => {
            this.collection.update({_id: criteria}, {$set: obj}).exec();
            resolve(obj);
        });
    }
    delete_one(criteria); {
        return new Promise((resolve, reject) => {
            this.collection.delete(criteria);
            resolve('done');
        });
    }
}

//module.exports = (QQ)Repository;
