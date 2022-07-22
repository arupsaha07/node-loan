var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var customerModel = require('../models/customers.model');

/* GET All Customers */
router.get('/list', function (req, res, next) {
  // res.send('respond with a resource');
  customerModel.find(function (err, customerListResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to find Customers' });
    } else {
      const recordCount = customerListResponse.length;
      res.send({ status: 200, recordCount: recordCount, results: customerListResponse });
    }
  })
});






/* GET Details of specific Customer */
router.get('/view', (req, res) => {

  const customerId = req.query.customerId;

  customerModel.findById(customerId, function (err, customerResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to find the Customers' });
    } else {
      res.send({ status: 200, results: customerResponse });
    }
  });
});





/* Create New customer */
router.post('/add', function (req, res, next) {

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let dob = req.body.dob;

  let customerObj = new customerModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    dob: dob
  });

  customerObj.save(function (err, customerObj) {
    if (err) {
      res.send({ status: 500, message: 'Unable to add Customer' });
    } else {
      res.send({ status: 200, message: 'Sucessfully added Customer', customerDetails: customerObj });
    }
  })

});






/* Update existing customer */
router.put('/update', function (req, res, next) {

  const userId = req.body.userId;

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let dob = req.body.dob;

  let customerObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    dob: dob
  };

  customerModel.findByIdAndUpdate(userId, customerObj, function (err, customerResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to update the Customers' });
    } else {
      res.send({ status: 200, results: customerObj });
    }
  })
});





/* Delete existing customer */
router.delete('/delete', function (req, res, next) {
  const userId = req.query.userId;

  customerModel.findByIdAndDelete(userId, function (err, customerResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to find the Customers' });
    } else {
      res.send({ status: 200, results: customerResponse });
    }
  })
});






/* Search existing customer */
router.get('/search', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;