import { Category } from '../../models';

const saveCategory = async ({
  user,
  name,
  code,
  description,
  imageUrl
}) => {

  try {
    const category = new Category({
      Name: name,
      Code: code,
      Description: description
    })
    await category.save();
    return { category };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default saveCategory;
