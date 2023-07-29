"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Investment = Schema({
  investor_id: mongoose.Types.ObjectId,
  pyme_id: mongoose.Types.ObjectId,
  invested: Number,
  creationDate: Date,
});

module.exports = mongoose.model("Investment", Investment);
