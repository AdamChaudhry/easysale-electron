import mongoose from 'mongoose';

const { Schema } = mongoose;
const manufacturerSchema = new Schema({
  Name: String,
  Code: String,
  Description: String,
  ImagePath: String,
  CreatedAt: Date
});

export default mongoose.model('Manufacturer', manufacturerSchema, 'Manufacturer');
