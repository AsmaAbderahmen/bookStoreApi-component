import {book} from './books-model.mjs';

export default class bookRepository {
    constructor(){
        this.collection = book
    }
    getAll(data){
        let per_page= data.per_page
        let page= data.page
        return new Promise((resolve, reject) => {
            let classes = this.collection.find({}, '_id author name image pages price',
            {
                skip: ((per_page * page) - per_page),
                limit: per_page,
                populate: {
                    path: 'author',
                    select: '_id fullname biography image'
                }
            })
            .sort({ createdAt: -1 });
            resolve(classes);
        });
    }
    getCount(){
        return new Promise((resolve, reject) => {
            let classes = this.collection.countDocuments();
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


