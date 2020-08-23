import mongoose from 'mongoose';

const { Schema } = mongoose;
const CustomerSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Phone: String,
  Email: String,
  Address: String,
  ImgPath: String,
  ShopId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  Addedby: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  }
});

export default mongoose.model('Customer', CustomerSchema, 'Customer');
