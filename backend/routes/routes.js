const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');
var Document = models.Document;
var User = models.User;
//import {TodoItem} from '../models/TodoItem';

function uniq(a) {
   return Array.from(new Set(a));
}

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());



router.get('/isLoggedIn', function (req, res) {
  if (!req.session.user) {
    res.send({loggedIn: false});
  } else {
    res.send({loggedIn: true});
  }
})

// router.use(function(req, res, next){
//   if (!req.user) {
//     res.send({error: "User is not logged in."});
//   } else {
//     return next();
//   }
// });

//get all documents where user is an owner OR collaborator
router.get('/documents/all/:userId', function(req,res) {

    var userId = req.params.userId;
    if(!userId){
        //if the user id is empty
        console.log('the user id was undefined in get all documents');
    }
    User.findById(userId, function(err, user){
        if(err){
            console.log('error finding user for all docuemnts', err);
            res.status(500).json({success: false})
        } else if(user) {
            user.getAllDocuments(function(err, documents){
                if(err){
                    console.log('error getting docuemnts', err);
                    res.status(500).json({success: false, message: 'Unable to get user information'})
                } else{
                    if(documents) {
                        // console.log('documents found ', documents);
                        res.status(200).json({success: true, documents: documents});
                    } else {
                        console.log('user foudn but had no docuemtns');
                        res.status(200).json({success: true, documents: []})
                    }
                }
            })
        } else {
            console.log('user not found');
            res.status(400).json({err: err})
        }
    })
})

//get document by id
router.get('/documents/:docId', function(req,res) {
    var docId = req.params.docId;
    Document.findById(docId)
    .populate('collaborators')
    .populate('author')
    .exec()
    .then((doc) => {
        if(doc){
            res.status(200).json({success: true, document: doc})
        } else {
            console.log('document  not found');
            res.status(400).json({err: err})
        }
    })
    .catch((err) => {
        console.log('document  not found');
        res.status(400).json({err: err})
    })
    // Document.findById(docId, function(err, doc){
    //     if(err){
    //         console.log('error finding  document by id');
    //         res.status(500).json({err: err})
    //     } else{
    //         if(doc){
    //             res.status(200).json({success: true, document: doc})
    //         } else {
    //             console.log('document  not found');
    //             res.status(400).json({err: err})
    //         }
    //     }
    //
    // })
})


//get all documents where user is an owner
router.get('/documents/owned/:userId', function(req,res) {
    var userId = req.params.userId;
    User.findById(userId, function(err, user){
        if(err){
            console.log('error finding user for owned  docuemnts');
            res.status(500).json({err: err})
        } else if(user) {
            user.getOwnedDocuments(function(err, documents){
                if(err){
                    console.log('error getting owned docuemnts', err);
                    res.status(500).json({err: err, message: 'Unable to get user information'})
                } else{
                    if(documents) {
                        console.log('owned documents found ', documents);
                        res.status(200).json({documents: documents});
                    } else {
                        console.log('user foudn but had no  owned docuemtns');
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

//get all documents where user is a collaborator, not an owner
router.get('/documents/collaborate/:userId', function(req,res) {
    var userId = req.params.userId;
    User.findById(userId, function(err, user){
        if(err){
            console.log('error finding user for collaborated docuemnts');
            res.status(500).json({err: err})
        } else if(user) {
            user.getCollaboratedDocuments(function(err, documents){
                if(err){
                    console.log('error getting collaborated docuemnts', err);
                    res.status(500).json({err: err, message: 'Unable to get user information'})
                } else{
                    if(documents) {
                        console.log('collaborated documents found ', documents);
                        res.status(200).json({documents: documents});
                    } else {
                        console.log('user foudn but had no collaborated only docuemtns');
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


router.post('/documents/add/collaborator/:documentId', function(req, res){
    console.log('entered router collaborater route');
    var docId = req.params.documentId;
    console.log('collab email ', req.body.collaboratorEmails, typeof req.body.collaboratorEmails, typeof req.body);
    var collaboratorEmails = []
    // collaboratorEmails.push(req.body.collaboratorEmails)
    var collaboratorEmails = req.body.collaboratorEmails; //TODO: make it so that req.body.collaborators comes in already as an array of email strings
    console.log('collaboratorEmails  from bod ', collaboratorEmails, 'with type ', typeof collaboratorEmails);
    Document.findById(docId)
    // .populate('collaborators')
    .populate('author')
    .exec()
    .then((doc) => {
        if(doc) {
            console.log('doc found ', doc);
            const currentCollaborators = doc.collaborators;
            User.find({email: { $in: collaboratorEmails}}, function(err, users){
                console.log('enet4ed user find collaborat emails are ', collaboratorEmails);
                if(err){
                    console.log('error funding users with those emails ', err);
                    res.status(500).json({success: false, error: err})
                } else {
                    if(users && users.length>0){
                        console.log('users were found ', users);
                        users.forEach((user) => {
                            console.log('looking at user ', user);
                            var userRef = mongoose.Types.ObjectId(user._id);
                            var alreadyExists = currentCollaborators.some((collaborator) => {
                                console.log('checking if ', userRef, 'matches ', collaborator);
                                return JSON.stringify(collaborator) === JSON.stringify(userRef)
                            })
                            console.log('alreadyExists for the the user ref ', userRef, 'is ', alreadyExists);
                            if(!alreadyExists) {
                                currentCollaborators.push(userRef)
                            }

                            doc.title = doc.title;
                            doc.content = doc.content;
                            doc.collaborators = currentCollaborators;
                            doc.password = doc.password;
                            doc.save(function(err, updatedDoc) {
                                if(err){
                                    console.log('error saving doc after added collabs', err);
                                    res.status(400).json({success: false, error: err})
                                } else {
                                    console.log('successful ADD collabs', updatedDoc);
                                    res.status(200).json({success: true, document: updatedDoc}) //if document update is successful, send successful response with the document
                                }
                            })
                        })
                    } else {
                        console.log('couldnt find any users with those emails ');
                        res.status(400).json({success: false})
                    }
                }
            });
        } else {
            console.log('document not found, cant update 1', err);
            res.status(500).json({success: false, error: err})
        }

    })
    .catch((err) => {
        console.log('document not found, cant update 2', err);
        res.status(500).json({success: false, error: err})
    })

    // Document.findById(docId, function(err, doc) {
    //     if(err){
    //         console.log('error finding document in the add collaborators', err);
    //         res.status(500).json({err: err})
    //     } else{
    //         if(doc) {
    //             console.log('doc found ', doc);
    //             const currentCollaborators = doc.collaborators;
    //             User.find({email: { $in: collaboratorEmails}}, function(err, users){
    //                 console.log('enet4ed user find collaborat emails are ', collaboratorEmails);
    //                 if(err){
    //                     console.log('error funding users with those emails ', err);
    //                     res.status(500).json({success: false, error: err})
    //                 } else {
    //                     if(users && users.length>0){
    //                         console.log('users were found ', users);
    //                         users.forEach((user) => {
    //                             console.log('looking at user ', user);
    //                             var userRef = mongoose.Types.ObjectId(user._id);
    //                             var alreadyExists = currentCollaborators.some((collaborator) => {
    //                                 console.log('checking if ', userRef, 'matches ', collaborator);
    //                                 return JSON.stringify(collaborator) === JSON.stringify(userRef)
    //                             })
    //                             console.log('alreadyExists for the the user ref ', userRef, 'is ', alreadyExists);
    //                             if(!alreadyExists) {
    //                                 currentCollaborators.push(userRef)
    //                             }
    //
    //                             doc.title = doc.title;
    //                             doc.content = doc.content;
    //                             doc.collaborators = currentCollaborators;
    //                             doc.password = doc.password;
    //                             doc.save(function(err, updatedDoc) {
    //                                 if(err){
    //                                     console.log('error saving doc after added collabs', err);
    //                                     res.status(400).json({success: false, error: err})
    //                                 } else {
    //                                     console.log('successful ADD collabs', updatedDoc);
    //                                     res.status(200).json({success: true, document: updatedDoc}) //if document update is successful, send successful response with the document
    //                                 }
    //                             })
    //                         })
    //                     } else {
    //                         console.log('couldnt find any users with those emails ');
    //                         res.status(400).json({success: false})
    //                     }
    //                 }
    //             });
    //         } else {
    //             console.log('document not found, cant update', err);
    //             res.status(500).json({success: false, error: err})
    //         }
    //
    //     }
    // })
})
//triggered when you click save on a document
//req.body should contain the fields to update
router.post('/documents/save/:documentId', function(req,res) {
    var docId = req.params.documentId;
    var docTitle = req.body.title;
    var docPassword = req.body.password;
    var docContent = req.body.content;
    var docCollaborators = req.body.collaborators;
    var docContentHistory = req.body.contentHistory;
    console.log('doc id received in save ', docId);

    Document.findById(docId, function(err, doc) {
        if(err){
            console.log('error finding document in the save', err);
            res.status(500).json({err: err})
        } else{
            if(doc) {
                doc.title = docTitle || doc.title;
                doc.content = docContent || doc.content;
                doc.collaborators = docCollaborators || doc.collaborators;
                doc.password = docPassword || doc.password;
                doc.contentHistory = docContentHistory || doc.contentHistory;
                doc.contentHistory = uniq(doc.contentHistory);
                console.log("Routes", doc.contentHistory);
                doc.save(function(err, updatedDoc) {
                    if(err){
                        console.log('error updating  doc', err);
                        res.status(400).json({error: err})
                    } else {
                        console.log('successful update', updatedDoc);
                        res.status(200).json({success: true, document: updatedDoc}) //if document update is successful, send successful response with the document
                    }
                })
            } else {
                console.log('document not found, cant update', err);
                res.status(400).json({err: err})
            }

        }
    })
})


//post to create a new document
//the body should include the document content, the title, the password
router.post('/documents/new/:authorId', function(req,res) {
    console.log('entered new docs route');
     var userId = req.params.authorId;
     var docTitle = req.body.title;
     var docPassword = req.body.password || '';
     var docContent = req.body.content || '';

     var newDocument = new Document({
         title: docTitle,
         author: userId,
         collaborators: [userId], //TODO: can u specify collaborators upon document creation
         shareLink: 'sharelink.com', //TODO:
         content: docContent,
         password: docPassword,
         dateCreated: Date.now().toString(),
         })


     newDocument.save(function(err, doc) {
         if(err){
             console.log('error saving new doc', err);
             res.status(400).json({error: err})
         } else {
             console.log('successful save', doc);
             res.status(200).json({success: true, document: doc}) //if document save is successful, send successful response with the document
         }
     })

})

//TODO: createa  route that will be used when user adds a collaborator to the document, wait to see how we do this in the ui
router.post('/documents/addCollaborator/:authorId', function(req,res) {
    // console.log('entered new docs route');
    //  var userId = req.params.authorId;
    //  var docTitle = req.body.title;
    //
    //  var newDocument = new Document({
    //      title: docTitle ,
    //      author: userId,
    //      collaborators: [userId],
    //      shareLink: 'sharelink.com',
    //     //  password: '',
    //      dateCreated: Date.now().toString(),
    //      })
    //
    //
    //  newDocument.save(function(err, doc) {
    //      if(err){
    //          console.log('error saving new doc', err);
    //          res.status(400).json({error: err})
    //      } else {
    //          console.log('successful save', doc);
    //          res.status(200).json({success: true, document: doc}) //if document save is successful, send successful response with the document
    //      }
    //  })

})


module.exports = router;
