const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String,
    userid : String
});

const User = mongoose.model("user",UserSchema);

module.exports = User;