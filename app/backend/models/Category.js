import mongoose from 'mongoose';

const { Schema } = mongoose;
const CategorySchema = new Schema({
  Name: {
    type: String,
    unique: true
  },
  Code: {
    type: String,
    unique: true
  },
  Description: String,
  ImagePath: String
}, {
  timestamps: {
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  }
});

export default mongoose.model('Category', CategorySchema, 'Category');
