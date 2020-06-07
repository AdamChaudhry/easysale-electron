import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema({
  FirstName: String,
  LastName: String,
  Phone: String,
  Gender: Number,
  Email: String,
  Password: String,
  Status: Number,
  ImgPath: String,
  RoleId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  ShopId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  Addedby: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  CreatedAt: Date
});

export default mongoose.model('User', UserSchema, 'User');
