const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const DB_URL=process.env.MONGODB_URL;

const Connection=async()=>{
    mongoose.connect(DB_URL)
    .then(()=>{
        console.log("Database Connected Successfully");
    }).catch(err=>console.error("Could not connect to MongoDb",err));
    
}
module.exports=Connection;