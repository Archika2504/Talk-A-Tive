const asynchandler = require("express-async-handler");
const usermodel = require("../models/userModel");
const jwt=require("jsonwebtoken");

const protect=asynchandler(async(req,res,next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user= await usermodel.findById(decoded.id).select("-password");
            next();
        }
        catch(err){
            res.status(400);
            throw new Error("Not authorized, token failed");
        }
    
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");

    }
});

module.exports={protect};
