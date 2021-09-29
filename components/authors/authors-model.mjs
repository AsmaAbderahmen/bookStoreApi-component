import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authors_schema = Schema({

},{
    timestamps : true ,  usePushEach: true
});
export const author= mongoose.model('author', authors_schema)

