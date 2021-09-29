import { author } from './authors-model.mjs';

export default class authorRepository {
    constructor() {
        this.collection = author
    }
    getAll(data) {
        return new Promise((resolve, reject) => {
            let classes = this.collection.find()
                .limit(data.per_page)
                .skip((data.per_page * data.page) - data.per_page)
            resolve(classes);
        });
    }
    getCount() {
        return new Promise((resolve, reject) => {
            let classes = this.collection.countDocuments()
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
            this.collection.create((obj));
            resolve(authors);
        });
    }

}


