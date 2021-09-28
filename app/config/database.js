import mongoose from 'mongoose';

const connection_url = process.env.DB_PATH;
mongoose.Promise = global.Promise;

class Connect{
    constructor(){
        this.connect()
    };
    async  connect () {
       let client= await  mongoose.connect(connection_url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,poolSize: 20000})
            .catch(e => {return e});
        if (client) {
            return client
        }

    }
}

export const Db_connect_file = Connect;


