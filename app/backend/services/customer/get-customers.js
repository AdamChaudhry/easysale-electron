import mongoose from 'mongoose';
import { Customer } from '../../models';

const getCustomers = async ({ user, filter }) => {
  const { keyword } = filter || {};

  const match = {};
  if (keyword) {
    match.Name = new RegExp(keyword, 'i');
  }

  const customers = await Customer.aggregate([
    { $match: match }
  ]);

  return { customers: JSON.parse(JSON.stringify(customers)) };
};

export default getCustomers;
