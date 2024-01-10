const mongoose = require('mongoose');
// formát pro ukládání dat
var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    adress : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;