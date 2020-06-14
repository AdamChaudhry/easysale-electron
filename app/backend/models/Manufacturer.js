import mongoose from 'mongoose';

const { Schema } = mongoose;
const manufacturerSchema = new Schema({
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

export default mongoose.model('Manufacturer', manufacturerSchema, 'Manufacturer');
