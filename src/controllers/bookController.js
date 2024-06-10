const Book=require('../models/Book');
let bookController={};
bookController.getBooks=async (req,res)=>{
    try{
        const {title,author}=req.body;
        let query={};
        if(author){
            query.author={$regex: author,$options: 'i'};
        }
        if(title){
            query.title={$regex: title, $options:'i'};
        }
        console.log("Query is::::",query);
        const books=await Book.find(query);
        if(books.length==0)
        {
            return res.status(200).json({success: false,message: "No Books Found!"});
        }
        return res.status(200).json({success: true,message: "Book Found Successfully",data: books})
    }catch(err){
        console.error("Error While Fetching the Data::", err);
        return res.status(500).JSON({success: false, message: " Internal Server Error"});
    }
};
bookController.create=async (req,res)=>{
    try{
        const {title,author}=req.body;
        const existBook=await Book.findOne({title,author});
        if(existBook)
        {
            return res.status(400).json({success: false,message: "Book is Already Exist"});
        }
        const newBook=await Book.create({title,author});
        console.log("New Book is:::::",newBook);
        return res.status(200).json({success: true, message: "Book is Successfully Saved",data: newBook});
    }catch(err){
        console.error("Error While Creating the Book",err);
        return res.status(500).json({success: false,message: "Internal Server Error"});
    }
}
module.exports=bookController;