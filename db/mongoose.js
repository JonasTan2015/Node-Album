var userCollection = require('mongoose');

userCollection.Promise = global.Promise;
userCollection.connect(process.env.MONGODB_URI);


var sessionCollection = require('mongoose');
sessionCollection.Promise = global.Promise;
sessionCollection.connect(process.env.SESSION_URI);
module.exports = {
  userCollection:userCollection,
  sessionCollection:sessionCollection
};
