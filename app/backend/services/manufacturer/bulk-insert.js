import fs from 'fs';
import { Manufacturer } from '../../models';

const bulkInsertManufacturer = async ({
  user,
  manufacturers
}) => {
  try {
    await Manufacturer.insertMany(manufacturers);

    const allManufacturers = await Manufacturer.find({}).exec();
    return { manufacturers: JSON.parse(JSON.stringify(allManufacturers)) };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default bulkInsertManufacturer;
