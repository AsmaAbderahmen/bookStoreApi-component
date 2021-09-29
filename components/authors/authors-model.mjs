import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authors_schema = Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    biography: {
        type: String,
    },
    image: {
        type: String
    },
},{
    timestamps : true ,  usePushEach: true
});
export const author= mongoose.model('author', authors_schema)

