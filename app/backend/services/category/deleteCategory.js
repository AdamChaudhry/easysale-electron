import mongoose from 'mongoose';
import { Category } from '../../models';

const deleteCategory = async ({ user, id }) => {
try {
    await Category
      .deleteOne({ _id: id })
      .exec();

    return { status: true };
  }
  catch(err) {
    return { error: err.message };
  }
};

export default deleteCategory;
