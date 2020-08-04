import mongoose from 'mongoose';
import shortid from 'shortid';

const { Schema } = mongoose;
const CategorySchema = new Schema({
  Name: {
    type: String,
    unique: true
  },
  Code: {
    type: String,
    unique: true,
    default: () => {
      const code = shortid.generate();
      return `cat-${code}`
    }
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
