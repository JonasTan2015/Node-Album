var DB = require("../services/DatabaseServices");

var authCtrl = function(req,res){
	if(req.body.email===undefined||req.body.email===""||req.body.password===undefined||req.body.password==="")
		return res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
	DB.authenticateUser(req.body.email, req.body.password, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
	});
};


/*var signupCtrl = function(req, res) {
    DB.User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
}*/

var signupCtrl = function(req,res){
	if(!req.body.email||!req.body.password)return res.json({
		type:false,
		data: "Email and password required"
	});
	
	DB.findByEmail(req.body.email).then(function(user){
		if(user){
			throw new Error("User already exists");
		}
	})
	.then(function(){
		return DB.createUser(req.body.email,req.body.password);
	})
	.then(function(user){
		console.log(user);
		 res.json({
                            type: true,
                            data: user,
                            token: user.token
                        });
	}).catch(function(err){
		if(err.message==="User already exists")
		return res.json({
                    type: false,
                    data: "User already exists!"
                });
		else
			return res.json({
				type:false,
				data:"Server busy. Please try later"
				});
	});
};


/*
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return res.send(403);
    }
}
*/

var ensureAuthorized=function(req,res,next){
	var barerToken;
	var bearerHeader = req.headers["authorization"];
	if(typeof bearerHeader==='undefined'){
		return res.send(403);
	}

	var bearer = bearerHeader.split(" ");
    bearerToken = bearer[0];
	if(!bearerToken)return res.send("Token format wrong");
	var promise = DB.findByToken(bearerToken);
	promise.then(function(doc){
		
		if(!doc){
			return res.send(403);
		}else{
			
			req.headers["Email"]=doc.email;
			next();
		}
	});
}

module.exports={
	authCtrl:authCtrl,
	signupCtrl:signupCtrl,
	ensureAuthorized:ensureAuthorized
};