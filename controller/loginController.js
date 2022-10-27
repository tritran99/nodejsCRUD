const express = require('express');
// const employeeController = require('./controller/employeeController');
var router = express.Router();
var mongoose = require('mongoose');
const UserLogin = mongoose.model('UserLogin');

router.get('/', (req,res) => {
  res.render("login/loginPage", {
    viewTitle: "Login"
  });
});

// router.post('/login', (req, res) => {
//   loginUser(req, res);
// });

function loginUser(req,res) {
  var userLogin = new UserLogin();
  userLogin.userName = req.body.userName;
  userLogin.passWord = req.body.passWord;
  userLogin.save((err, doc) => {
    res.render("login/loginPage", {
      viewTitle: "Login",
      userLogin: req.body
    });
  });
}


module.exports = router;