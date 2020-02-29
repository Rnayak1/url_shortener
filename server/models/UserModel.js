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
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: function () {
            return (Date.now() + (10 * 60 * 1000))
        }
    }
}), 'UrlManager');

const clickModel = mongoose.model('clickModel', new Schema({
    hashLink: String,
    query: String,
    country: String,
    regionName: String,
    city: String,
    zip: String,
    isp: String,
    lon: Number,
    lat: Number,
}), 'ClickCapture');

module.exports = {
    userModel,
    loginModel,
    urlModel,
    clickModel
}