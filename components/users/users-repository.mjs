import { verify } from "crypto";
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
    }

}