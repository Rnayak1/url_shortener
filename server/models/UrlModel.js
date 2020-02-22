const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('urlModel', new Schema({
    orignalLink : {
        type : String,
        required : true
    },
    hashLink : {
        type : String,
        required : true
    },
    userId : String
}),'UrlManager');