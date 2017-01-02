var express    = require("express");

var bodyParser = require("body-parser");
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");
var app        = express();

var Schema  = mongoose.Schema;

var UserSchema   = new Schema({
    email: String,
    password: String,
    token: String,
    photoURLs:[String]
});
var User = mongoose.model('User', UserSchema);
process.env.JWT_SECRET="secret";
const port = 3000;


/* userModel=new User();
userModel.email='JonasTan2015@hotmail.com';
userModel.password='12345';
userModel.photoURLs=['demo.jpg'];
userModel.save(function(err,user){console.log(user);});
*/

//insert a photoURL
/*
User.update(
    { email: 'JonasTan2015@hotmail.com' }, 
    { $push: { photoURLs: 'newphoto.jpg'} },
    function(err,user){
		console.log(user);
	}
);

User.update(
    { email: 'JonasTan2015@hotmail.com' }, 
    { $push: { photoURLs: 'newphoto1.jpg'} },
    function(err,user){
		console.log(user);
	}
);
//delete an photoURL

User.update(
	{ email: 'JonasTan2015@hotmail.com' },
	{ $pull: { photoURLs: 'newphoto1.jpg' } },
    function(err,user){
		console.log(user);
	}
);
*/
var insertAPhotoURL = function(email,photourl,callback){
		User.update(
		{ email: email }, 
		{ $addToSet: { photoURLs: photourl} },
		callback
		);
};

var deleteAPhotoURL = function(email,photourl,callback){
		User.update(
		{ email:email},
		{ $pull: { photoURLs: photourl}},
		callback
		);
};

var authenticateUser = function(email,password,callback){
	 User.findOne({email: email, password: password}, callback);
};


//authenticateUser('JonasTan2015@hotmail.com','12345',function(err,res){console.log(res);})
//insertAPhotoURL('JonasTan2015@hotmail.com','newphoto3.jpg',function(err,res){console.log(res);});

//deleteAPhotoURL('JonasTan2015@hotmail.com','newphoto3.jpg',function(err,res){console.log(res);});


var promise = User.findOne({email:"Jonasan2015@hotmail.com"}).exec();
promise.then(function(doc){console.log(doc);});


// Connect to DB
mongoose.connect( 'mongodb://localhost:27017/TestingDatabase' );