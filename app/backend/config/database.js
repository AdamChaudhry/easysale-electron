const mongoose = require('mongoose');
const { DATABASE } = require('./setting');

mongoose.connect(DATABASE.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB::', err));