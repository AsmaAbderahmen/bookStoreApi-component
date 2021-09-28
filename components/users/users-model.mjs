import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const password_recovering_Schema= Schema({
    expiration_date: {
        type: Date
    },
    code: Number
})
const users_schema = Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required:true
    },
    password_recovering: password_recovering_Schema
},{
    timestamps : true ,  usePushEach: true
});


export const User= mongoose.model('user', users_schema)

