import mongoose from 'mongoose';
const mongooseLeanGetters = require('mongoose-lean-getters');

const { Schema } = mongoose;
const ProductSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    get: v => v ? v.toString() : v,
    auto: true
  },
  Name: String,
  Type: Number,
  Code: String
});

ProductSchema.plugin(mongooseLeanGetters);

export default mongoose.model('Product', ProductSchema, 'Product');
