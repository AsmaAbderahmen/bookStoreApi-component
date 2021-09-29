import {book} from './books-model.mjs';

export default class bookRepository {
    constructor(){
        this.collection = book
    }
    getAll(){
        return new Promise((resolve, reject) => {
            let classes = this.collection.find();
            resolve(classes);
        });
    }
    getById(id){
        return new Promise((resolve, reject) => {
            let classes = this.collection.findById(id);
            resolve(classes);
        });
    }
    create(obj) {
        return new Promise((resolve, reject) => {
            this.collection.create((obj));
            resolve(books);
        });
    }
    update(criteria, obj) {
        return new Promise((resolve, reject) => {
            this.collection.update({ _id: criteria }, { $set: obj }).exec();
            resolve(obj);
        });
    }
    delete_one(criteria) {
        return new Promise((resolve, reject) => {
            this.collection.delete(criteria);
            resolve('done');
        });
    }
}


