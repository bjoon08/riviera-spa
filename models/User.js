const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
        set: value => value.toISOString().split('T')[0],
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        ref: 'Role',
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);
