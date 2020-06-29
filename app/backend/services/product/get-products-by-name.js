import mongoose from 'mongoose';
import { Product } from '../../models';

const getProducts = async ({ filter }) => {
  const { keyword } = filter;

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }

  const products = await Product.aggregate([
    { $match: match },
    { $limit: 100 }
  ]);

  return { products: JSON.parse(JSON.stringify(products)) };
};

export default getProducts;
