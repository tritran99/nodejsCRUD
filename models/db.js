const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/equipmentCompany', {useNewUrlParser: true}, (err) => {
  if (!err) {
    console.log('Connect MongoDB sucessfully');
  } else {
    console.log('Error connection:' + err);
  }
});
require('./employee.model');