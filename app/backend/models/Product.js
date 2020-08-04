import mongoose from 'mongoose';
import shortid from 'shortid';

const { Schema } = mongoose;
const ProductSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Type: { type: Number },
  Code: {
    type: String,
    unique: true,
    default: () => {
      const code = shortid.generate();
      return `prod-${code}`
    }
  },
  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  ManufacturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer'
  },
  Stock: {
    Qty: {
      type: Number,
      default: 0
    },
    UpdatedAt: {
      type: Date,
      default: () => new Date().toISOString()
    },
    UpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  Price: {
    type: Number,
    required: true
  },
  Cost: { type: Number },
  MinQty: {
    type: Number,
    default: 0
  },
  ImgPath: { type: String },
  Description: { type: String },
  SKU: { type: String },
  Combo: [{
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    Qty: Number
  }],
  Addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  }
});

ProductSchema.index(
  { Name: 1, ManufacturerId: 1 },
  { unique: true }
);

export default mongoose.model('Product', ProductSchema, 'Product');
