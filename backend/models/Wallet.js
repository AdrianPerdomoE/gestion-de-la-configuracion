'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Wallet = Schema({ 
    owner_id: mongoose.Types.ObjectId,
    money: Number
});

module.exports = mongoose.model("Wallet", Wallet);