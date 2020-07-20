import mongoose from 'mongoose';
import { Product } from '../../models';

const getProducts = async ({ user, filter }) => {
  const { keyword, CategoryId, ManufacturerId } = filter;

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }

  if (CategoryId) {
    match.CategoryId = mongoose.Types.ObjectId(CategoryId);
  }

  if (ManufacturerId) {
    match.ManufacturerId = mongoose.Types.ObjectId(ManufacturerId);
  }

  const products = await Product.aggregate([
    { $match: match }
  ]);

  return { products: JSON.parse(JSON.stringify(products)) };
};

export default getProducts;
