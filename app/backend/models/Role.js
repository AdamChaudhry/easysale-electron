import mongoose from 'mongoose';

const { Schema } = mongoose;
const RoleSchema = new Schema({
  Name: String,
  Resourses: [{
    Name: String,
    Grants: Array
  }],
  CreatedAt: Date,
  UpdatedAt: Date
});

export default mongoose.model('Role', RoleSchema, 'Role');
