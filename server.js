const exp = require("express");
const app = exp();
const mongoose = require("mongoose");
const path = require("path");

app.use(exp.static(path.join(__dirname,"./dist/Store")));

app.use(exp.json());

require("dotenv").config();




const dburl = process.env.dburl;

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;

db.on("error",()=>console.log("err in db connection"));
db.once("open",()=>console.log("connected to db"));

const userApiObj = require("./APIs/userApi");
const activityApiObj = require("./APIs/activityApi");

app.use("/user",userApiObj);
app.use("/activity",activityApiObj);

app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`});
})

app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send({message:"error occured",reason:err.message});
})


const port = process.env.port;
app.listen(port,()=>console.log(`Server started on port ${port}`))

