import mongoose from 'mongoose';
import { DATABASE } from './setting.json';

mongoose
  .connect(DATABASE.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB::', err));
