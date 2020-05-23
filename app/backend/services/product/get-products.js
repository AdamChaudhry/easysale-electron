import { Product } from '../../models';

const getProducts = async ({ keyword, skip = 0, limit = 25 }) => {
  const match = {};

  if (keyword) {
    match.Name = new RegExp(keyword);
  }

  const products = await Product.aggregate([
    { $match: match },
    { $skip: skip },
    { $limit: limit }
  ]);

  return { products };
};

export default getProducts;
