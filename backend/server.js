const express = require('express')
const session = require('express-session')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const MongoStore = require('connect-mongo/es5')(session);
const routes = require('./routes/routes');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const models = require('./models/models.js')
const app = express()
const server = require('http').createServer(app); //make a http server to use for the sockets
const io = require('socket.io')(server);
const _ = require('underscore');
//can add event handlers to this
var online = [];
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet']


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser('secretCat'));
app.use(express.static('build'));

app.use(session({
    secret: 'Catscoookie',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // proxy: true,
    resave: true,
    // saveUninitialized: true
}));

passport.serializeUser(function(user, done) {
  console.log("SERIALIZAE");
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  console.log("DESERIAL");
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"}, function(email, password, done) {
    console.log("LOCAL");
    models.User.findOne({ email: email }, function (err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.error('error in passport local strategy finding user with that email', err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false, { message: 'Incorrect email/username.' });
      }
      // if passwords do not match, auth failed
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      // auth has has succeeded
      return done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes);

if (! process.env.MONGODB_URI) {//check if source env.sh has been run
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() { //prints when connected
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {//error connecting
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);


// const server = app.listen(3000, function () {
//   console.log('Backend server for Electron App running on port 3000!')
// })
// const io = require('socket.io')(server);
server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})


io.on('connection', (socket) => {
  // console.log('a user connected');

//CODEALONG
  //listen for joined events when users enter
  socket.on('joined', ({doc, user}) => {

      socket.join(doc) //give join the string name of the room, this joins that room
      console.log(io.nsps['/'].adapter.rooms[doc].length);
      if(io.nsps['/'].adapter.rooms[doc].length >= 6) {
        socket.emit('redirect');
        return;
      }

      console.log('user has joined a room', doc);
      socket.emit('welcome', {doc}) //emit back to the sending user
      socket.documentRoom = doc; //create a new key on the socket object with information you want to be accessible in all the handlers

      online.push(user);
      online[online.length - 1].color = colors[online.length - 1];
      online = _.uniq(online, '_id');

      io.to(doc).emit('onlineUpdated', {online});
      //broadcast a userjoined event to everyone but sender that is in the room named doc
      socket.broadcast.to(doc).emit('userjoined');

  })


//CODEALONG
socket.on('newContent', stringifiedContent => {
    // console.log('received new content about to emit receivednewcontent');
    socket.broadcast.to(socket.documentRoom).emit('receivedNewContent', stringifiedContent)
})

socket.on('newContentHistory', contentHistory => {
  console.log("In socket");
  io.to(socket.documentRoom).emit('receivedNewContentHistory', contentHistory);
})

socket.on('cursorMove', selection => {
    // console.log('selection',selection);
    // console.log('received cursormove');
    socket.broadcast.to(socket.documentRoom).emit('receiveNewCursor', selection)
})

// socket.on('testsend', (data) => {
//     // console.log('selection',selection);
//     // console.log('received cursormove');
//     socket.broadcast.to(socket.documentRoom).emit('testrecieve', data)
// })

//CODEALONG
//this will get called when disconnect is dispatched, do cleanup here
//when people leave the pagethis is where you are notified
  socket.on('disconnect', ({userleft}) => {
    if(!userleft) {
      return;
    }
    console.log('user disconnecteddddd');
    var index = 0;
    for(var i = 0; i < online.length; i++) {
      if(online[i] === userleft._id) {
        index = i;
        break;
      }
    }
    online.splice(index, 1);
    socket.leave(socket.documentRoom) //leave the room, get the doc from the key we stored on the socket
    io.to(doc).emit('onlineUpdated', {online});
    socket.broadcast.to(socket.documentRoom).emit('userleft') //emit to all other users in room that user has left
  });



//-------------


//someone joined the room
  socket.on('room', (data) => {
    console.log('joined room on room socket listener');
    // socket.join(data);
    // console.log(io.nsps['/'].adapter.rooms[data].length);
    // if(io.nsps['/'].adapter.rooms[data].length >= 6){
    //   socket.emit('redirect');
    // }
  });

  socket.on('cursor', (data) => {
    // console.log(data);
    console.log('about to broadcast update event');
    // socket.broadcast.to(data.room).emit('update', data);
  });

  socket.on('limit', () => {
    window.location.href = '/';
  });

});
