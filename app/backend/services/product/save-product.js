import fs from 'fs';
import { Product } from '../../models';

const saveProduct = async ({
  user,
  name,
  code,
  type,
  description,
  manufacturer,
  category,
  price,
  cost,
  minQty,
  imageUrl,
  comboProducts
}) => {
  try {
    const product = new Product({
      Name: name,
      Type: type,
      Code: code,
      Description: description,
      CategoryId: category,
      ManufacturerId: manufacturer,
      Price: price,
      Cost: cost,
      MinQty: minQty,
      Combo: comboProducts,
      Addedby: user._id
    })
    await product.save();
    return { product };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default saveProduct;
