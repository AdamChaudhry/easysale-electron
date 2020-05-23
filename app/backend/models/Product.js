const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  Name: String,
  Type: Number,
  Code: String
});

module.exports = mongoose.model('Product', ProductSchema, 'Product');