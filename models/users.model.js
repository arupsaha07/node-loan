const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    email: String,
    password: String
});

const userModel  = mongoose.model('Users', usersSchema);

module.exports = userModel;