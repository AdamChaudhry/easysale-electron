import mongoose from 'mongoose';

const { Schema } = mongoose;
import shortId from 'shortid';

const SaleSchema = new Schema({
  InvoiceNo: {
    type: String,
    required: true,
    unique: true,
    default: () => {
      const code = shortid.generate();
      return `ivc-${code}`
    }
  },
  CustomerName: { type: String },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  CartItems: { type: Array },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  PaymentMode: {
    type: Number,
    required: true
  },
  CardNo: { type: String },
  Note: { type: String },
  Date: {
    type: Date,
    required: true,
    default: new Date()
  },
  Status: {
    type: Number,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  }
});

export default mongoose.model('Sale', SaleSchema, 'Sale');
