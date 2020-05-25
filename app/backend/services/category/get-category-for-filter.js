import { Category } from '../../models';

const getCategoriesForFilter = async () => {
  const categories = await Category.aggregate([
    {
      $project: {
        _id: { $toString: '$_id' },
        Name: 1
      }
    }
  ]);
  return { categories };
};

export default getCategoriesForFilter;
