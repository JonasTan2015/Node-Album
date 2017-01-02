require('../config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.SESSION_URI);

var Session = mongoose.model('mySessions', {

},'mySessions');
 // new Session({Name:'Jack'}).save();
// Session.find().then((todos) => {
//     console.log({todos});
//   }, (e) => {
//     console.log(e);
//   });
// new Todo({text:"Dinner"}).save();

module.exports = {Session};
