import {auth} from './auths-model.mjs';

export default class authRepository {
    constructor(){
        this.collection = auth
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
          let classes=   this.collection.create(obj);
            resolve(classes);
        });
    }
    
}


