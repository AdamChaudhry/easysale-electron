import mongoose from 'mongoose';
import { Category } from '../../models';

const getCategories = async ({ filter, skip = 0, limit = 25 }) => {
  const { keyword } = filter;

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }

  const total = await Category.countDocuments(match);
  const categories = await Category.aggregate([
    { $match: match },
    { $skip: skip },
    { $limit: limit },
    // {
    //   $project: {

    //   }
    // }
  ]);

  return { categories, total };
};

export default getCategories;
