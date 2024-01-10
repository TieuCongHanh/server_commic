// models/user.js
const db = require('./db');

const userSchema = new db.mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fullname: { type: String, required: true }
},
{
  collection:'User'
});

const User = db.mongoose.model('User', userSchema);

module.exports = {User};