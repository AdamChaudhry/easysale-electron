import mongoose from 'mongoose';

const { Schema } = mongoose;
const StoreSchema = new Schema({
  Name: String,
  Address: String,
  Phone: String,
  Email: String,
  Logo: String,
  Addedby: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  CreatedAt: Date
});

export default mongoose.model('Store', StoreSchema, 'Store');
