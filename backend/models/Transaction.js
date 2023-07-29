'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Transaction = Schema({ 
    wallet_id: mongoose.Types.ObjectId,
    value: Number,
    detail: String,
    creationDate: Date
});

module.exports = mongoose.model("Transaction", Transaction);