import mongoose from 'mongoose';
import { Product } from '../../models';

const getProducts = async ({ user, filter }) => {
  const { ids, names, codes } = filter;
  const match = {};

  if (names && names.length) {
    match.Name = { $in: names };
  }

  if (codes && codes.length) {
    match.Code = { $in: codes };
  }

  const products = await Product.aggregate([
    { $match: match }
  ]);

  return { products: JSON.parse(JSON.stringify(products)) };
};

export default getProducts;
