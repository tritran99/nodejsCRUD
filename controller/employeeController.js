// require('/models/db');

const express = require('express');
// const employeeController = require('./controller/employeeController');
var router = express.Router();
var mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req,res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Add Equipment"
  });
});

router.post('/', (req,res) => {
  if (req.body._id == '')
  insertRecord(req, res);
  else
  updateRecord(req, res);
})

function insertRecord(req,res) {
  var employee = new Employee();
  employee.typeEquipment = req.body.typeEquipment;
  employee.name = req.body.name;
  employee.deviceID = req.body.deviceID;
  employee.status = req.body.status;
  employee.description = req.body.description;
  employee.employeeAssign = req.body.employeeAssign;
  employee.save((err,doc) => {
    if (!err) 
    res.redirect('employee/list');
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body
        });
      }
      else
      console.log('Error during inserting:' + err);
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err, doc) => {
    if (!err) {
      res.redirect('employee/list');
    }
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Update Employee",
          employee: req.body
        });
      }
      else
        console.log("Error during updating:" + err);
    }
  });
}
router.get('/list', (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs
      });
    } else {
      console.log('Error in get equipment list' + err);
    }
  });
});

function handleValidationError(err,body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'typeEquipment':
        body['typeEquipment'] = err.errors[field].message;
        break;
      case 'name': 
      body['nameError'] = err.errors[field].message;
      break;
      default:
        break;

    }
  }
}

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err,doc) => {
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Update Employee",
        employee: doc
      });
    }
  });
});

router.get('delete/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err,doc) => {
    if (!err) {
      res.redirect('/employee/list');
    } else {
      console.log('Error in employee delete:' + err);
    }
  });
});
// var app = express();
// app.listen(3000, () => {
//   console.log('Express server started at port:3000');
// });
module.exports = router;