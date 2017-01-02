var mongoose   = require("mongoose");
var jwt        = require("jsonwebtoken");
mongoose.Promise = Promise; 

var Schema  = mongoose.Schema;

var UserSchema   = new Schema({
    email: String,
    password: String,
    token: String,
    photoURLs:[String]
});
var User = mongoose.model('User', UserSchema);

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

var findByToken = function(token){
	return User.findOne({token:token}).exec();
}

var findByEmail = function(email){
	return User.findOne({email:email}).exec();
};

var createUser = function(email,password){
	var user=new User();
	user.email = email;
    user.password = password;
	user.photoURLs=[];
	user.token = jwt.sign(user, process.env.JWT_SECRET);
    return user.save();
};

mongoose.connect( 'mongodb://localhost:27017/connect_mongodb_session' );

module.exports={
	User:User,
	authenticateUser:authenticateUser,
	insertAPhotoURL:insertAPhotoURL,
	deleteAPhotoURL:deleteAPhotoURL,
	findByToken:findByToken,
	findByEmail:findByEmail,
	createUser:createUser
};
