'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Order = Schema({ 
    client_id: mongoose.Types.ObjectId,
    value: Number,
    creationDate: Date
});

module.exports = mongoose.model("Order", Order);