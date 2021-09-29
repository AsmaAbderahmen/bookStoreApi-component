import {User} from './users-model.mjs';

export default class userRepository{
    constructor(){
        this.collection = User
    }
    verifyExistance(filter_object){
        return new Promise((resolve, reject) => {
            let classes = this.collection.exists(filter_object);
            resolve(classes);
        });
    }
    create(obj) {
        return new Promise((resolve, reject) => {
            let classes = this.collection.create(obj);
            resolve(classes);
        });
    };
    get_user(filter_object){
        return new Promise((resolve, reject) => {
            let classes = this.collection.findOne(filter_object);
            resolve(classes);
        });
    };

    update(data){
        return new Promise((resolve, reject) => {
            let classes = this.collection.updateOne(data.filter_object,data.updating_obj);
            resolve(classes);
        });
    };
}