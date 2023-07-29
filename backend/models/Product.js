"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = Schema({
  name: String,
  pyme_id: String,
  price: Number,
  description: String,
  stock: Number,
  ignored: Boolean,
  creationDate: Date,
  updateDate: Date,
  image: String,
});

module.exports = mongoose.model("Product", Product);
