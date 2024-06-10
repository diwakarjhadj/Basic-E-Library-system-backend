const Author=require('../models/Author');
let authorController={};
authorController.addAuthor=async (req,res)=>{
    try{
        const {name,DOB,email}=req.body;
        let query={};
        if(name){
            query.author={$regex: name,$options: 'i'};
        }
        if(DOB){
            query.title={$regex: DOB, $options:'i'};
        }
        if(email){
            query.email={$regex: email,$options: 'i'};
        }
        console.log("Query is::::",query);
        const author=await Author.find(query);
        if(author)
        {
            return res.status(200).json({success: false,message: "author is already Exist"});
        }
        const newAuthor=await Author.create({name,DOB,email});
        return res.status(201).json({success: true, message: "Author Created SuccessFully",data: newAuthor});
    }catch(err){
        console.error("Error while Creating the Author",err);
        return res.status(500).json({success: false,message: "INternal Server Error"});
    }
};

authorController.updateAuthor=async (req,res)=>{
    console.log("Update Author::::::");
    try{
        const author_id=req.query.author_id;
        const existAuthor=await Author.findById(author_id);
        if(!existAuthor)
        {
            return res.status(400).json({success: false,message: "Author NOt Exist"});
        }
        const updatedAuthor=await Author.findByIdAndUpdate(author_id,req.body);
        let data={
            author_id: updatedAuthor._id.toString(),
            name: updatedAuthor.name,
            DOB: updatedAuthor.DOB,
            email: updatedAuthor.email
        }
        return res.status(200).json({success: true,message: "Author Updated Successfully",data: data});
    }catch(err)
    {
        console.log("Error while updating the user");
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
module.exports=authorController;