import { Manufacturer } from '../../models';

const getManufacturersForFilter = async () => {
  const manufacturers = await Manufacturer.aggregate([
    {
      $project: {
        _id: { $toString: '$_id' },
        Name: 1
      }
    }
  ]);
  return { manufacturers };
};

export default getManufacturersForFilter;
