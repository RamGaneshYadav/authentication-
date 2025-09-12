const { signup,login } = require('../Controllers/AuthController');
const { signupValidation,loginValidation } = require('../Middlewares/Authvalidation');

const router =require('express').Router();
// router.post('/login',(req,res)=>{
//     res.send('login success'); 
// });
router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);

// check  to postman api connection
// router.post('/signup',(req,res)=>{
//     res.send('signup success'); 
// });
  module.exports = router;

  