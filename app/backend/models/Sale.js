import mongoose from 'mongoose';
import shortid from 'shortid';

const { Schema } = mongoose;

const SaleSchema = new Schema({
  InvoiceNo: {
    alias: 'invoiceNo',
    type: String,
    required: true,
    unique: true,
    default: () => {
      const code = shortid.generate();
      return `ivc-${code}`
    }
  },
  CustomerName: {
    type: String,
    alias: 'customerName'
  },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    alias: 'customerId',
    ref: 'Customer'
  },
  CartItems: {
    type: Array,
    alias: 'cartItems'
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    alias: 'userId',
    ref: 'User'
  },
  PaymentMode: {
    type: Number,
    alias: 'paymentMode',
    required: true
  },
  CardNo: {
    type: String,
    alias: 'cardNo'
  },
  Note: {
    type: String,
    alias: 'note'
  },
  Date: {
    type: Date,
    alias: 'date',
    required: true,
    default: new Date()
  },
  Status: {
    type: Number,
    alias: 'status',
    required: true
  },
  ReceivedFromCustomer: {
    type: Number,
    alias: 'receivedFromCustomer',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  }
});

export default mongoose.model('Sale', SaleSchema, 'Sale');
