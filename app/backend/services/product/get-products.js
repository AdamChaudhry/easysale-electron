const { Product } = require('../../models');

const getProducts = async ({ }) => {
  const products = await Product.aggregate([
    {
      $skip: 0
    }, {
      $limit: 20
    }
  ]);
  return { products };
}

module.exports = getProducts;
