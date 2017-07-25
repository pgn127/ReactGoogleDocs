const express = require('express');
const router = express.Router();
var models = require('../models/models.js');
var Document = models.Document;
var User = models.User;
//import {TodoItem} from '../models/TodoItem';

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());



router.get('/isLoggedIn', function (req, res) {
  if (!req.user) {
    res.send({loggedIn: false});
  } else {
    res.send({loggedIn: true});
  }
})

router.use(function(req, res, next){
  if (!req.user) {
    res.send({error: "User is not logged in."});
  } else {
    return next();
  }
});

//get all documents where user is an owner OR collaborator
router.get('/documents/all/:userId', function(req,res) {
  User.find().populate().exec({ author:req.params.userId, collaborators: req.params.userId},function(err,user){
    if(err || !user){
      res.status(400).json({error:err});
    }else{
      res.status(200).json(user.closet);
    }

  });

})

//get all documents where user is an owner
router.get('/documents/owned/:userId', function(req,res) {

})

//get all documents where user is a collaborator
router.get('/documents/collaborate/:userId', function(req,res) {

})

//post to create a new document
router.post('/documents/new', function(req,res) {

})


module.exports = router;
