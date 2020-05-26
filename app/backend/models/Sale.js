import mongoose from 'mongoose';

const { Schema } = mongoose;
const SaleSchema = new Schema({
  Name: String,
  Type: Number,
  Code: String
});

export default mongoose.model('Sale', SaleSchema, 'Sale');
