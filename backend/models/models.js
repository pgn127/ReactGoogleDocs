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
  author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  },
  collaborators: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
  }],
  shareLink: String,
  password: {
         type: String,
  },
  dateCreated: String,
})


var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);
module.exports = {
  User: User,
  Document: Document
 };
