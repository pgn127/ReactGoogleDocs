const express = require('express')
const app = express()
const mongoose = require('mongoose');
const routes = require('./routes/routes');




app.use('/', routes);
// This line makes the build folder publicly available.
app.use(express.static('build'));

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
