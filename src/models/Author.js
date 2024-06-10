const mongoose=require('mongoose');
const authorSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    DOB:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    author_id:{
        type: String,
        required: true,
        unique: true
    },
});
const Author=mongoose.model("Author",authorSchema);
module.exports=Author;
