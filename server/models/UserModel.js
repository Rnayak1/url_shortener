const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('userModel',new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required: true,
        minlength : 6
    },
    contact : {
        type : Number,
        minlength : 10,
        maxlength : 10,
        required : true
    },
    status : {
        type : String,
        default : 'inactive'
    }
}),'UserManager');