import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const books_schema = Schema({

},{
    timestamps : true ,  usePushEach: true
});
export const book= mongoose.model('book', books_schema)

