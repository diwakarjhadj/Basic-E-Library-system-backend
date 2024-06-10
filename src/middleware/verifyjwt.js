const jwt=require('jsonwebtoken');
const User= require('../models/User');
require('dotenv').config();
const VerifyJwt=async (req,res,next)=>{
    const token=req.header('token');
    console.log("TOken");
    if(!token)
    {
        return res.status(401).json({success: false, message: "Token not Provide",data:{}});
    }
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Verified::::::",verified);
        const user=await User.findById(verified.data.user_id);
        console.log("User::::::::::::::::::",user);
        if(!user) return res.status(401).json({success: false, message: "User not Exist"});
        req.user=user;
        next();
    }catch(err)
    {
        console.error("Please Provide a Token::::",err);
        return res.status(400).json({success: false, message: "Please Prove a Token or Token may be Expired",data:{}});
    }
}
module.exports=VerifyJwt;