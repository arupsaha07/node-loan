var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
let userModel = require('../models/users.model');

var salt = bcrypt.genSaltSync(10);


/* User Registration */

router.post('/register', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  let hashPassword = bcrypt.hashSync(password, salt)


  let userObj = new userModel({
    email: email,
    password: hashPassword
  })

  userObj.save((err, userObj) => {
    if (err) {
      res.send({ status: 500, message: 'Unable to add user' })
    } else {
      res.send({ status: 200, message: 'Successfully added user', userDetail: userObj })
    }
  })
});


/* User Login */

// router.post('/login', (req,res)=>{
// let email = req.body.email;
// let password = req.body.password;


// let decryptedPass = bcrypt.compareSync(password, password); // true

// console.log(res.body.email)

// let userObj = new userModel({
//   email: email,
//   password: decryptedPass
// })


// userObj.findOne(email, decryptedPass, function(err, userObj){
//   res.send({userDetail: userObj})
// })




// })


router.post('/login', (req, res) => {


  let email = req.body.email;
  let password = req.body.password;

  if(!email || !password){
    return res.send({status:400, results: "plz fill the data"});
  }

  // let decryptedPass = bcrypt.compareSync(Epass);

  // let userObj = new userModel({
  //   email: email,
  //   password: password
  // })

  userModel.findOne({email:email}, function (err, userResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to find the User' });
    } else {
      res.send({ status: 200, results: userResponse.email });

      // console.log(userResponse)
    }
  });
});


module.exports = router;
