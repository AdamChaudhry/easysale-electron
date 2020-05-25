import mongoose from 'mongoose';
import { Product } from '../../models';

const getProducts = async ({ filter, skip = 0, limit = 25 }) => {
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

  const total = await Product.countDocuments(match);
  const products = await Product.aggregate([
    { $match: match },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: 'Category',
        localField: 'CategoryId',
        foreignField: '_id',
        as: 'Category'
      }
    },
    {
      $unwind: {
        path: '$Category',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'Manufacturer',
        localField: 'ManufacturerId',
        foreignField: '_id',
        as: 'Manufacturer'
      }
    },
    {
      $unwind: {
        path: '$Manufacturer',
        preserveNullAndEmptyArrays: true
      }
    },
    // {
    //   $project: {

    //   }
    // }
  ]);

  return { products, total };
};

export default getProducts;
