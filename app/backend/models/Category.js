import mongoose from 'mongoose';

const { Schema } = mongoose;
const CategorySchema = new Schema({
  Name: String,
  Code: String,
  Description: String,
  ImagePath: String,
  CreatedAt: Date
});

export default mongoose.model('Category', CategorySchema, 'Category');
