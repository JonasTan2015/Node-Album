
var express    = require("express");
var bodyParser = require("body-parser");
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
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

app.get('/',function(req,res){
	return res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/*.html$',function(req,res){
	
	var temp=req.url.split('/');
	var doc=temp[temp.length-1];
	return  res.sendFile(path.join(__dirname + '/'+doc));
});
app.get('/*.js$',function(req,res){
	return res.sendFile(path.join(__dirname + '/uploadDirective.js'));
});
//signin page
app.post('/authenticate',bodyParser.json(),controllers.authCtrl);

//create new account page
app.post('/signin', bodyParser.json(),controllers.signupCtrl);

app.get('/me', bodyParser.json(),controllers.ensureAuthorized, function(req, res) {
	console.log(req.headers.Email);
    return res.send("Token found");
});

app.post('/upload', controllers.ensureAuthorized,function(req, res){
  // create an incoming form object
 
  
  var dirPath=path.join(__dirname, '/uploads/',req.headers["Email"]);
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
	};
	
  var form = new formidable.IncomingForm();

  form.multiples = true;
  form.uploadDir = dirPath;
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
	res.json({UploadMessage:'failure'});
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.json({message:'success'});
	
	
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

process.on('uncaughtException', function(err) {
    console.log(err);
});


// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});


module.exports.app=app;
