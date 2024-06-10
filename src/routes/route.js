const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const bookController=require('../controllers/bookController');
const authorController=require('../controllers/authorController');
const verifyJwt=require('../middleware/verifyjwt');
router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.put('/update',verifyJwt,authController.update);


// Route For Books

router.post('/addBooks',bookController.create);
router.get('/getBook',bookController.getBooks);

// Route For Authors
router.post('/addAuthor',authorController.addAuthor);
router.put('/updateAuthor',authorController.updateAuthor);

module.exports=router;