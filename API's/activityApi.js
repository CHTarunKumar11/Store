const exp = require("express");
const asynchandler = require("express-async-handler");

const activityApiObj = exp.Router();

const Activity = require("../Models/Activity");

const verifyToken = require("./middlewares/verifyToken");

activityApiObj.post("/addactivity",verifyToken,asynchandler(async(req,res,next)=>{

    activityObj = req.body;

    newActivity = new Activity({
        username : activityObj.username,
        userid : activityObj.id,
        title : activityObj.title,
        activity : activityObj.activity,
        time : activityObj.time,
        pin : activityObj.pin
    })

    await newActivity.save();
    res.send({message:"activity added successfully"});
}))

activityApiObj.get("/getactivities/:username",verifyToken,asynchandler(async(req,res,next)=>{
    let username =  req.params.username;
    let activities = await Activity.find({$and : [{username:username},{pin:false}]});
    res.send({message:"success",activities:activities});

}))

activityApiObj.delete("/deleteactivity/:id",verifyToken,asynchandler(async(req,res,next)=>{
    let id = req.params.id;
    await Activity.remove({id:id});
    res.send({message:"activity deleted successfully"});
}))

activityApiObj.post("/updateactivity",verifyToken,asynchandler(async(req,res,next)=>{
    activityObj = req.body;
    await Activity.updateOne({id:activityObj.id},{title:activityObj.title,activity:activityObj.activity,time:activityObj.time,pin:activityObj.pin});
    res.send({message:"activity updated successfully"});
}))

activityApiObj.get("/getremainders/:username",verifyToken,asynchandler(async(req,res,next)=>{
    let username =  req.params.username;
    let activities = await Activity.find({$and : [{username:username},{time : {$ne : ""}}]});
    res.send({message:"success",activities:activities});

}))

activityApiObj.get("/getpinnedactivities/:username",verifyToken,asynchandler(async(req,res,next)=>{
    let username =  req.params.username;
    let activities = await Activity.find({$and : [{username:username},{pin:true}]});
    res.send({message:"success",activities:activities});

}))



module.exports = activityApiObj;