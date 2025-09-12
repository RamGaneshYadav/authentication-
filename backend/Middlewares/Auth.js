const jwt =require('jsonwebtoken');


const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization']
    if(!auth){
        return res.status(403)
        .json({
            message: 'Unauthorized, JWT token is require'});
    }

    // jwt token received  and decript
    try{
     const decoded =jwt.verify(auth,process.env.JWT_SECRET);//veryfy only token 
     req.user=decoded;//decode payload store to req
     next();

    }catch(err){
        return res.status(403)
        .json({
            message: 'Unauthorized, JWT token  wrong or expired'
        });
    
    }
 }
 module.exports=ensureAuthenticated;