var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore(
      {
        uri: process.env.SESSION_URI,
        collection: 'mySessions'
      });

    // Catch errors
    store.on('error', function(error) {
      console.log(error);
      //assert.ok(false);
    });


var sessionsettings={
  name:'sessionID',
  secret: 'This is a secret',
  cookie: {

    maxAge: 1000 * 60 *60*24// 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: truetest.js,
  saveUninitialized: false
};

module.exports={settings:sessionsettings};
