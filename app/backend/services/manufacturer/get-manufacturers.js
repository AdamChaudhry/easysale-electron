import mongoose from 'mongoose';
import { Manufacturer } from '../../models';

const getManufacturers = async ({ filter, skip = 0, limit = 25 }) => {
  const { keyword } = filter;

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }

  const total = await Manufacturer.countDocuments(match);
  const manufacturers = await Manufacturer.aggregate([
    { $match: match },
    { $skip: skip },
    { $limit: limit }
  ]);

  return { manufacturers, total };
};

export default getManufacturers;
