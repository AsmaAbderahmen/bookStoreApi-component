import { author } from './authors-model.mjs';

export default class authorRepository {
    constructor() {
        this.collection = author
    }
    getAll() {
        return new Promise((resolve, reject) => {
            let classes = this.collection.find({})
            .sort({ updatedAt: -1 });
            resolve(classes);
        });
    }
   
    getOne(filter) {
        return new Promise((resolve, reject) => {
            let classes = this.collection.findOne(filter);
            resolve(classes);
        });
    }
    create(obj) {
        return new Promise((resolve, reject) => {
            let classes = this.collection.create(obj);
            resolve(classes);
        });
    }

}


