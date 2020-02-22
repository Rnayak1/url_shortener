const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('clickModel',new Schema({
    hashLink : String,
    ip : String,
    city : String,
    postal : Number,
    isp : String,
    lattitude : Number,
    longitude : Number,
}),'ClickCapture');