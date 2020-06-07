import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import keytar from 'keytar';
import { User } from '../../models';

const login = async ({ email, password }) => {
  const user = await User.findOne({
    Email: email,
    Password: password
  })
    .populate([
      {
        path: 'ShopId',
        model: 'Store'
      },
      {
        path: 'RoleId',
        model: 'Role'
      }
    ])
    .lean()
    .exec();

  if (!user) throw new Error('INVALID_CREDENTIALS');

  const token = jwt.sign(user, 'shhhhh');
  await keytar.setPassword('easysale', user.email, token);
  return { user, token };
};

export default login;
