// Add Passport-related auth routes here.

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var models = require('../models/models');
var User = mongoose.model('User')
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



module.exports = function(passport) {


//when login is successful, we are sent ot this route where we send back information for react to route to directory
  router.get('/login/success', function (req, res) {
    //eventually this should send over the user we will have in req.user
    res.status(200).json({success:true, user:req.user});
  })


    // GET registration page
  router.get('/register', function(req, res) {
    console.log('in register');
  });

  // POST registration page
  var validateReq = function(userData) {
    return (userData.password === userData.passwordRepeat);
  };

  router.post('/register', function(req, res) {
    console.log('register');
    var u = new models.User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });

    User.find({email: req.body.email}, function(err, user){
      if(err) {
        console.log("Error in register", err);
        res.status(500).redirect('/register');
        return;
      }
      if(user) {
        console.log("User exists")
        res.redirect('/login');
      }
      else {
        u.save(function(err, user) {
          if (err) {
            console.log(err);
            res.status(500).redirect('/register');
            return;
          }
          console.log(user);
          res.status(200).json({success:true, user: user});
        });
      }

    })
  });

  // GET Login page
  //sent here when post to login goes to failure redirect
  router.get('/login/failure', function(req, res) {
      console.log('in auth.js get login failure');
    // res.render('login');
    res.status(500).json({success:false});
  });

  // POST Login page
  // router.post('/login', passport.authenticate('local'), function(req, res) {
  //   console.log('in post login req is ', req, 'res is ', res);
  //   // console.log(res.session);
  //   // console.log(req.session);
  //   res.status(200).json({success:true})//, user:req.user});
  // });


  router.post('/login', passport.authenticate('local', { successRedirect: '/login/success',
                                   failureRedirect: '/login/failure' }));

  // GET Logout page
  router.get('/logout', function(req, res) {
  //   req.session.destroy(function (err) {
  //   res.redirect('/'); //Inside a callback… bulletproof!
  // });
    req.logout();
    res.send({success: true});
  });

  return router;
};
