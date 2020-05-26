import mongoose from 'mongoose';
import { Sale } from '../../models';

const getSales = async ({ filter, skip = 0, limit = 25 }) => {
  const { keyword, CategoryId, ManufacturerId } = filter;

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }

  const total = await Sale.countDocuments(match);
  const sales = await Sale.aggregate([
    { $match: match },
    { $skip: skip },
    { $limit: limit }
  ]);

  return { sales, total };
};

export default getSales;
