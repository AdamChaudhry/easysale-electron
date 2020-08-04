import fs from 'fs';
import { Category } from '../../models';

const bulkInsertCategory = async ({
  user,
  categories
}) => {
  try {
    await Category.insertMany(categories);

    const allCategories = await Category.find({}).exec();
    return { categories: JSON.parse(JSON.stringify(allCategories)) };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default bulkInsertCategory;
