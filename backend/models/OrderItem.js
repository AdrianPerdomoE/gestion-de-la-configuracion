"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderItem = Schema({
  order_id: mongoose.Types.ObjectId,
  product_id: mongoose.Types.ObjectId,
  amount: Number,
  storeName: String,
});

module.exports = mongoose.model("OrderItem", OrderItem);
