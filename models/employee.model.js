const mongoose = require('mongoose');
var employSchema = new mongoose.Schema({
  typeEquipment: {
    type: String
  },
  name: {
    type: String
  },
  deviceID: {
    type: String
  },
  status: {
    type: String
  },
  description: {
    type: String
  },
  employeeAssign: {
    type: String
  }
});

// employSchema.path('email').validate((val) => {
//   emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return emailRegex.test(val);
// }, 'Invalid e-mail.');
mongoose.model('Employee', employSchema);