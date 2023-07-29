'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = Schema({ 
    name: String,
    password: String,
    shoppingKart: Object,
    email:String
});

module.exports = mongoose.model("User",User);