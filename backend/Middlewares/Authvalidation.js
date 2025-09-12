 const { request } = require('express');
 const Joi = require('joi');

// signup input validation define
 const signupValidation =(req,res,next)=>{
    const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).pattern(/^\S+$/, 'no-spaces').required()
        });
    const{error}=schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message:"Bad request..",error})
    }
    next();
}


// login input  validation 
const loginValidation =(req,res,next)=>{
    const schema = Joi.object({
    //name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).pattern(/^\S+$/, 'no-spaces').required()
    });
    const{error}=schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message:"Bad request..",error})
    }
    next();
}
module.exports={
    signupValidation,
    loginValidation
}