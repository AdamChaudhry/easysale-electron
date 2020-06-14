import mongoose from 'mongoose';
import { Category } from '../../models';

const updateCategory = async ({
  user,
  id,
  name,
  code,
  description,
  imageUrl
}) => {
try {
    await Category
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

export default updateCategory;
