const express = require('express');
const router = express.Router();
var models = require('../models/models.js');
var Event = models.Event;
var User = models.User;
//import {TodoItem} from '../models/TodoItem';

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.send('Hello World!')
})

//get all documents where user is an owner OR collaborator
router.get('/documents/all/:userId', function(req,res) {

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
