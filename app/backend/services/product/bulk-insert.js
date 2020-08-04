import fs from 'fs';
import { Product } from '../../models';

const bulkInsertProduct = async ({
  user,
  products
}) => {
  try {
    await Product.insertMany(products);

    const allProducts = await Product.find({}).exec();
    return { manufacturers: JSON.parse(JSON.stringify(allProducts)) };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default bulkInsertProduct;
