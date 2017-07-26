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
    // if (!validateReq(req.body)) {
    //   return res.json({
    //     error: "Passwords don't match."
    //   });
    // }
    var u = new models.User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });

    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log(user);
      res.status(200).json({success:true});
    });
  });

  // GET Login page
  // router.get('/login', function(req, res) {
  //   res.render('login');
  // });

  // POST Login page
  router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log('in login');
    // console.log(res.session);
    // console.log(req.session);
    res.status(200).json({success:true, user:req.user});
  });
  // router.post('/login',
  // passport.authenticate('local', { successRedirect: '/',
  //                                  failureRedirect: '/login' }));

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
