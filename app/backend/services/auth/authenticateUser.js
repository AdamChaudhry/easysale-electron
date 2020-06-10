import jwt from 'jsonwebtoken';
import keytar from 'keytar';

import { SECRET } from '../../config/setting.json';

const authenticateUser = async ({ token }) => {
  try {
    const user = jwt.verify(token, SECRET);
    const savedToken = await keytar.getPassword('easysale', user.Email);

    if (token != savedToken) throw new Error('UNAUTHORIZED');
    return { user };
  } catch (err) {
    return { error: err.message };
  }
};

export default authenticateUser;
