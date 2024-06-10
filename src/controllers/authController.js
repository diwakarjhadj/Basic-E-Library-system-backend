const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let authController = {};
authController.login = async (req, res) => {
  console.log("Login Api:::::::::", req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    let data = {
      user_id: user._id.toString(),
      username: user.username,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    data.token = token;
    return res
      .status(200)
      .json({ success: true, data: data, message: "Login Successfully" });
  } catch (err) {
    console.error("Error while Fetching the Data::", err);
    res.status(500).json({ success: false, message: "Interval Server Error" });
  }
};

authController.signup = async (req, res) => {
  console.log("Sign up :::::::", req.body);
  try {
    const { username, password } = req.body;
    const existuser = await User.findOne({ username });
    if (existuser) {
      return res.status(400).json({ error: "user Already Exist" });
    }
    const newUser = await User.create({ username, password });
    let data = {
      user_id: newUser._id.toString(),
      username: newUser.username,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    data.token = token;
    return res
      .status(200)
      .json({ success: true, data: data, message: "Signup Successfully" });
  } catch (err) {
    console.error("Error in signup api:::::", err);
    res.status(500).json({ success: false, messsage: "Internal Server Error" });
  }
};

authController.update=async (req,res)=>{
    console.log("Updated User::::::");
    try{
      const user_id=req.user._id;
      // console.log("User ID is :",req.user._id,user_id);
      const existuser=await User.findById(user_id);
      console.log("User Exist",existuser);
      if(!existuser)
      {
        return res.status(200).json({success: false,message: "User not Exist"});
      }
      const {username}=req.body;
      const updateUser= await User.findByIdAndUpdate(user_id,{ username: username });
      console.log("Updated User is :::::",updateUser);
      let data={
        user_id: updateUser._id.toString(),
        username: updateUser.username
      }
      return res.status(200).json({success: true,message: "User Updated Successfully", data: {...data}});
    }catch(err){
        console.log("Error while updating the user");
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};
module.exports=authController;
