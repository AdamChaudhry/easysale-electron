import mongoose from 'mongoose';
import { Product } from '../../models';

const getComboProducts = async ({ user, ids }) => {

  const products = await Product.find({
    _id: { $in: ids }
  })
    .exec();

  return { products: JSON.parse(JSON.stringify(products)) };
};

export default getComboProducts;
