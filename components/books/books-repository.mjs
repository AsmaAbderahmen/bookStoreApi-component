import {book} from './books-model.mjs';

export default class bookRepository {
    constructor(){
        this.collection = book
    }
    getAll(){
        return new Promise((resolve, reject) => {
            let classes = this.collection.find({}, '_id author name image pages price')
            .populate('author','_id fullname biography image')
            .sort({ updatedAt: -1 });
            resolve(classes);
        });
    }
 
    verifyExistance(filter_object){
        return new Promise((resolve, reject) => {
            let classes = this.collection.exists(filter_object);
            resolve(classes);
        });
    }
    getById(id){
        return new Promise((resolve, reject) => {
            let classes = this.collection.findById(id).populate('author','_id fullname biography image');
            resolve(classes);
        });
    }
    create(obj) {
        return new Promise((resolve, reject) => {
            let classes = this.collection.create((obj));
            resolve(classes);
        });
    }
    update(criteria, obj) {
        return new Promise((resolve, reject) => {
            let classes =  this.collection.updateOne({ _id: criteria }, { $set: obj }).exec();
            resolve(classes);
        });
    }
    deleteOne(criteria) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne(criteria);
            resolve('done');
        });
    }
}


