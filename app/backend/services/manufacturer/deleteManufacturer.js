import mongoose from 'mongoose';
import { Manufacturer } from '../../models';

const deleteManufacturer = async ({ user, id }) => {
try {
    await Manufacturer
      .deleteOne({ _id: id })
      .exec();

    return { status: true };
  }
  catch(err) {
    return { error: err.message };
  }
};

export default deleteManufacturer;
