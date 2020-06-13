import mongoose from 'mongoose';
const mongooseLeanGetters = require('mongoose-lean-getters');

const { Schema } = mongoose;
const CategorySchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    get: v => v ? v.toString() : v,
    auto: true
  },
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

CategorySchema.plugin(mongooseLeanGetters);

export default mongoose.model('Category', CategorySchema, 'Category');
