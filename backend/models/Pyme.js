'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Pyme = Schema({ 
    name: String,
    category: String,
    password: String,
    pageStyle: Object,
    creationDate: Date,
    email:String,
    logo:String
});

module.exports = mongoose.model("Pyme", Pyme);