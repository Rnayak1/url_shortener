const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('VerificationModel',new Schema({
    email : {
        type : String,
        required : true
    },
    token : {
        type : String,
        required : true
    }
}));