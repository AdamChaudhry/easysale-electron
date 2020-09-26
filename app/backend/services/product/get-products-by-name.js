import mongoose from 'mongoose';
import { Product } from '../../models';

const getProducts = async ({ filter, limit }) => {
  const { keyword } = filter;

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }
  const pipline = [{ $match: match }];
  if (limit) pipline.push({ $limit: limit });

  const products = await Product.aggregate(pipline);

  return { products: JSON.parse(JSON.stringify(products)) };
};

export default getProducts;
