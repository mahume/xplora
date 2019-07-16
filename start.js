const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

//  Connect to DB
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // ES6 Promises
mongoose.connection.on('error', err => {
  console.log(err.message);
});

// Start app
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running on PORT: ${server.address().port}`);
});
