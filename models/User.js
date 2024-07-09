const mongoose = require('mongoose'); // IMPORTA O MONGOOSE

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})


const User = mongoose.model('User', UserSchema);

module.exports = User
