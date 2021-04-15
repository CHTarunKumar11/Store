const exp = require("express");
const bcryptjs = require("bcryptjs");
const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userApiObj = exp.Router();

const User = require("../Models/User");

userApiObj.post("/loginuser",asynchandler(async(req,res,next)=>{

    credObj = req.body;

    user = await User.findOne({username:credObj.username})
    if(user)
    {
        status = await bcryptjs.compare(credObj.password,user.password)
        if(status)
        {
            token = await jwt.sign({username:user.username},"abcd",{expiresIn:1000});
            res.send({message:"success",signedToken:token,username:user.username,userid:user.userid});
        }
        else{
            res.send({message:"Invalid Password"});
        }
    }
    else{
        res.send({message:"Invalid Username"});
    }

}))

userApiObj.post("/registeruser",asynchandler(async(req,res,next)=>{

    userObj = req.body;

    user = await User.findOne({username:userObj.username})

    if(user)
    {
        res.send({message:"user already exits. Try again with another username."});
    }
    else
    {
        hashedpwd = await bcryptjs.hash(userObj.password,5);

        newUser = new User({
            firstname : userObj.firstname,
            lastname : userObj.lastname,
            username : userObj.username,
            password : hashedpwd,
            userid : userObj.userid,
        })
        await newUser.save();
        res.send({message:"success"});
    }

}))

userApiObj.post("/changepassword",asynchandler(async(req,res,next)=>{

    credObj = req.body;

    user = await User.findOne({username:credObj.username})
    if(user)
    {
        hashedpwd = await  bcryptjs.hash(credObj.password,5);
        await User.updateOne({username:credObj.username},{password:hashedpwd});
        res.send({message:"Password changed successfully."});
    }
    else{
        res.send({message:"Invalid Username"});
    }


}))

module.exports = userApiObj;