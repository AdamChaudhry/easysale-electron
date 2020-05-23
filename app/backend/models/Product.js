import mongoose from 'mongoose';

const { Schema } = mongoose;
const ProductSchema = new Schema({
  Name: String,
  Type: Number,
  Code: String
});

export default mongoose.model('Product', ProductSchema, 'Product');
