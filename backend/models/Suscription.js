"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Suscription = Schema({
  suscriptor_id: String,
  pyme_id: mongoose.Types.ObjectId,
  charge: Number,
  creationDate: Date,
});

module.exports = mongoose.model("Suscription", Suscription);
