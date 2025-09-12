const ensureAuthenticated = require('../Middlewares/Auth');

const router=require('express').Router();

router.get('/', ensureAuthenticated , (req,res)=>{
    console.log('---- logged in user details-- ' ,req.user);
    res.status(200).json([
        {
            firstname:"Ram Ganesh",
            lastname:"Yadav",
            email:"Ramganesh@gmail.com",
            phone:"9294860335",
            location:"bhopal",
            hobby:"coding"

        },
        {
            firstname:"Ram Ganesh",
            lastname:"Yadav",
            email:"Ramganesh@gmail.com",
            phone:"9294860335",
            location:"bhopal",
            hobby:"coding"
        },
        
    ])
});

module.exports=router;