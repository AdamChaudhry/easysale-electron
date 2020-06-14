import fs from 'fs';
import { Manufacturer } from '../../models';

const saveManufacturer = async ({
  user,
  name,
  code,
  description,
  imageUrl
}) => {
  try {
    const manufacturer = new Manufacturer({
      Name: name,
      Code: code,
      Description: description
    })
    await manufacturer.save();
    return { manufacturer };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default saveManufacturer;
