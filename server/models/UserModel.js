const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = mongoose.model('userModel', new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    contact: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    status: {
        type: String,
        default: 'inactive'
    },
    token: {
        type: String,
        required: true
    }
}), 'UserManager');

const loginModel = mongoose.model('loginModel', new Schema({
    email: String,
    password: String,
    username: {
        type: String,
        required: false
    }
}), 'UserManager')

const urlModel = mongoose.model('urlModel', new Schema({
    orignalLink: {
        type: String,
        required: true
    },
    hashLink: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}), 'UrlManager');

const clickModel = mongoose.model('clickModel', new Schema({
    hashLink: String,
    ip: String,
    city: String,
    postal: Number,
    isp: String,
    lattitude: Number,
    longitude: Number,
}), 'ClickCapture');

module.exports = {
    userModel,
    loginModel,
    urlModel,
    clickModel
}