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
const app = express()
const models = require('./models/models.js')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser('secretCat'));
app.use(express.static('build'));


app.use(session({
    secret: process.env.SECRET,
    name: 'Catscoookie',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

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

// passport strategy
passport.use(new LocalStrategy({usernameField:"name", passwordField:"password"}, function(name, password, done) {
    console.log("LOCAL");
    models.User.findOne({ name: name }, function (err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.error(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false, { message: 'Incorrect username.' });
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

app.use('/', auth(passport));
app.use('/', routes);
// This line makes the build folder publicly available.

app.use('/', (req, res) => {
  console.log("IN USE");
  res.sendFile(path.join(publicPath, 'index.html'));
});

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



app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
