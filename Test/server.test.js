const request = require('supertest');
const expect = require('expect');

var app = require('../test').app;
var DB = require("../services/DatabaseServices");
var controllers = require("../controllers/controllers");

describe("authenticate tests",()=>{
	it('post request to /authenticate without password or email',(done)=>{
	request(app)
	.post('/authenticate')
	.send()
	.expect(200)
	.expect((res)=>{
		expect(res.body).toInclude({
                    type: false,
                    data: "Incorrect email/password"
                });
	})
	.end(done);
	});
	
	
	it('post request to /authenticate with wrong password or email',(done)=>{
		request(app)
		.post('/authenticate')
		.send({"email":"guanyanliu@hotmail.com","password":"wrongpassword"})
		.expect(200)
		.expect((res)=>{
			expect(res.body).toInclude({
                    type: false,
                    data: "Incorrect email/password"
                });
		})
		.end(done);
	});
	

	
	
	it('post request to /authenticate with correct password or email',(done)=>{
		request(app)
		.post('/authenticate')
		.send({"password": "1234556",
    "email": "tkkka@kkkml.com"})
		.expect(200)
		.expect((res)=>{
			expect(res.body).toInclude({
                    type: true,
                });
		})
		.end(done);
	});
});

describe("/signin tests",()=>{
	it("/signin without email or password",(done)=>{
		request(app)
		.post('/signin')
		.send({})
		.expect(200)
		.expect((res)=>{
			expect(res.body).toInclude({
				type:false,
				data: "Email and password required"
			});
		})
		.end(done);
	});
	
	
	it("/signin with proper email and password",(done)=>{
		request(app)
		.post('/signin')
		.send({email:"tester@tester.com",password:"tester"})
		.expect(200)
		.expect((res)=>{
			expect(res.body).toInclude({
                            type: true,
                        });
		})
		.end((err,res)=>{
			if(!err)
			DB.User.findOneAndRemove({email:"tester@tester.com",password:"tester"}, function(doc){return done(doc);});
		}
		);
	});
});
