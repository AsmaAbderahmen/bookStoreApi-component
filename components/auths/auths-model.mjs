import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const auths_schema = Schema({

},{
    timestamps : true ,  usePushEach: true
});
export const auth= mongoose.model('auth', auths_schema)

