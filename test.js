
var express    = require("express");
var bodyParser = require("body-parser");
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");
var app        = express();


var controllers         = require("./controllers/controllers");


process.env.JWT_SECRET="secret";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//signin page
app.post('/authenticate',bodyParser.json(),controllers.authCtrl);

//create new account page
app.post('/signin', bodyParser.json(),controllers.signupCtrl);

app.get('/me', bodyParser.json(),controllers.ensureAuthorized, function(req, res) {
	console.log(req.url);
    return res.send("Token found");
});


process.on('uncaughtException', function(err) {
    console.log(err);
});


// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});


module.exports.app=app;
