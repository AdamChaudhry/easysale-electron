import fs from 'fs';
import { Category } from '../../models';

const saveCategory = async ({
  user,
  name,
  code,
  description,
  imageUrl
}) => {

  // if (imageUrl) {
  //   const path = `${process.cwd()}/categoey)`;
  //   if (!fs.existsSync(path)) {
  //     fs.mkdirSync(path);
  //   }
  //   const base64Image = imageUrl.split(';base64,').pop();
  //   await fs.writeFile(`${process.cwd()}/categoey/${Date.now()}.png`, base64Image, { encoding: 'base64' },  (err) => console.error(err));
  // }

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
