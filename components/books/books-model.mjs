import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const books_schema = Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    pages: {
        type: String
    },
    image: {
        type: String
    },
    author: {
        ref: 'author',
        type: Schema.Types.ObjectId,
    },
    price: {
        type: String,
    }
},{
    timestamps : true ,  usePushEach: true
});
export const book= mongoose.model('book', books_schema)

