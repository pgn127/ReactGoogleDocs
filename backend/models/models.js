var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
      type: String
  },
  password: {
        type: String,
  },
  email: {
       type: String,
  },
})

//owning user is also a collaborator
var documentSchema = new Schema({
    title: {
        type: String,
        default: 'Untitled Document'
    },
  author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  },
  collaborators: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
  }],
  content: String,
  shareLink: String,
  password: {
         type: String,
  },
  dateCreated: String,
  contentHistory: []
})
var Document = mongoose.model('Document', documentSchema);

// userSchema.methods.getAllDocuments = function (callback){
//   var userid = this._id;
//   Document.find({collaborators: {$all: [userid]}})
//   .populate('userId').exec(function(err,reviews){
//     callback(err,reviews);
//   })
// }

userSchema.methods.getCollaboratedDocuments = function (callback){
  var userid = this._id;
  //find all documents where user is oNLY A COLLABORATOR, NOT OWNER
  //find all documents where authorid!=userid but user present in the collaborators array
  Document.find({author: {$nin: [userid]}, collaborators: {$all: [userid]}}).populate('author').populate('collaborators')
  .exec(function(err,documents){
      console.log('documents only collaborate are ', documents);
    callback(err,documents);
  })
}

userSchema.methods.getOwnedDocuments = function (callback){
  var userid = this._id;
  //find all documents where userid is present inthe array of collaborators
  Document.find({author: userid}).populate('author').populate('collaborators')
  .exec(function(err,documents){
      console.log('documents owned by user are are ', documents);
    callback(err,documents);
  })
}

userSchema.methods.getAllDocuments = function (callback){
  var userid = this._id;
  //find all documents where userid is present inthe array of collaborators
  Document.find({collaborators: {$all: [userid]}}).populate('collaborators').populate('author')
  .exec(function(err,documents){
      console.log('documents are ', documents);
    callback(err,documents);
  })
}


var User = mongoose.model('User', userSchema);
module.exports = {
  User: User,
  Document: Document
 };
