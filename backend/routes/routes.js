const express = require('express');
const router = express.Router();
var models = require('../models/models.js');
var Document = models.Document;
var User = models.User;
//import {TodoItem} from '../models/TodoItem';

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.send('Hello World!')
})

//get all documents where user is an owner OR collaborator
router.get('/documents/all/:userId', function(req,res) {
    var userId = req.params.userId;
    User.findById(userId, function(err, user){
        if(err){
            console.log('error finding user for all docuemnts');
            res.status(500).json({err: err})
        } else if(user) {
            user.getAllDocuments(function(err, documents){
                if(err){
                    console.log('error getting docuemnts', err);
                } else{
                    if(documents) {
                        console.log('documents found ', documents);
                        res.status(200).json({documents: documents});
                    } else {
                        console.log('user foudn but had no docuemtns');
                        res.status(200).json({documents: []})
                    }
                }
            })
        } else {
            console.log('user not found');
            res.status(400).json({err: err})
        }
    })
})

//get all documents where user is an owner
router.get('/documents/owned/:userId', function(req,res) {

})

//get all documents where user is a collaborator
router.get('/documents/collaborate/:userId', function(req,res) {

})

//post to create a new document
router.post('/documents/new/:authorId', function(req,res) {
    console.log('entered new docs route');
     var userId = req.params.authorId;
     var docTitle = req.body.docTitle;

     var newDocument = new Document({
         title: docTitle ,
         author: userId,
         collaborators: [userId],
         shareLink: 'sharelink.com',
        //  password: '',
         dateCreated: Date.now().toString(),
         })


     newDocument.save(function(err, doc) {
         if(err){
             console.log('error saving new doc', err);
             res.status(400).json({error: err})
         } else {
             console.log('successful save', doc);
             res.status(200).json({success: true})
         }
     })

})


module.exports = router;
