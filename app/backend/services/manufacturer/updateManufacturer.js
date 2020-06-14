import mongoose from 'mongoose';
import { Manufacturer } from '../../models';

const updateManufacturer = async ({
  user,
  id,
  name,
  code,
  description,
  imageUrl
}) => {
try {
    await Manufacturer
      .updateOne(
        { _id: id },
        {
          Name: name,
          Code: code,
          Description: description
        },
        { runValidators: true }
      );

    return { status: true };
  }
  catch(err) {
    return { error: err.message };
  }
};

export default updateManufacturer;
