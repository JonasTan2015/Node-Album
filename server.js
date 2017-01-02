require('./config.js');


// const {userCollection,sessionCollection} = require('./db/mongoose');
const bodyParser = require('body-parser');
const express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const _ = require('lodash');
// const {User} = require ('./db/UserSchema');
// const {Session} = require('./db/SessionSchema');
const cookieParser = require('cookie-parser');
var sessionsettings = require('./db/sessionsettings').settings;



var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(sessionsettings));
const port = process.env.PORT;

// Session.find().then(function(doc){console.log(doc);});

// var checkWhetherLogin=function(req,res,next){
//   var incommingCookies=_.pick(req,['cookies']);
//   var sessionID=incommingCookies.cookies.sessionID;
//   sessionCollection.findOne({_id:sessionID}).then(function(doc){
//     if(!doc){}
//     else{
//       console.log(doc);
//     }
//   }).catch((e)=>{
//       return res.status(401).send();
//   });
//     req.email=req.session.email;
//     next();
// };


var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});

// router.post('/Login',function(req,res){
//   var body = _.pick(req.body,['email','password']);
//   User.findOne(body).then(function(doc){
//     if(!doc) return res.send({errMsg:"Invalid username or password"});
//     console.log(JSON.stringify(doc));
//     //res.cookie('sessionID', 'abcdefg').send('Cookie is set');
//
//     res.cookie('isVisit', 1, {maxAge: 60 * 1000});
//     res.send("欢迎第一次访问");
//   });
//
// });


// define the about route
router.post('/CreateUser',function(req,res){
    var body = _.pick(req.body, ['email', 'password']);
    if(!body.email||!body.password){
      return res.send({errMsg:"Email and password cannot be blank"});
    }
    var tempuser=new User(body);

    tempuser.save().then(function(doc){
      console.log(doc);
      req.session.email=body.email;
      res.send(body);
    }).catch((e) => {
    return res.send({errMsg:"Email already exists"});
    });
});

router.get('/about', function(req, res) {
  res.cookie('isVisit', '12345', {maxAge: 60 * 1000});
    res.send("欢迎第一次访问");
});


app.get('/',router);
app.post('/',router);
app.post('/CreateUser',router);
app.post('/Login',router);
app.get('/about',router);
app.get('/a', function(req, res) {
  req.session.name="James Bond";
  res.send("session test");
   });

app.get('/searchCookies',function(req,res){
  // if(req.cookies==={})return res.send("No cookies");
  var incommingCookies=_.pick(req,['sessionID']);
  if(_.isEmpty(incommingCookies.cookies)){return res.send(incommingCookies);};

  var sessionID=incommingCookies.cookies.sessionID;
  console.log(sessionID);
  res.send(req.sessionID);
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
