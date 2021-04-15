const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    let tokenWithBearer = req.headers["authorization"];

    if(tokenWithBearer)
    {
        let token = tokenWithBearer.slice(7,tokenWithBearer.length);
        jwt.verify(token,"abcd",(err,decoded)=>{
            if(err)
            {
                res.send({message: "Session expired. Please login again"});
            }
            else{
                next();
            }
        })
    }
    else{
        res.send({message:"Unauthorized access. Login to continue"});
    }
}

module.exports = verifyToken;