const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const UserModel = require("../Models/user");


const signup =async(req,res)=>{
 try{
    const {name,email,password}=req.body;
    const user= await UserModel.findOne({email});
    if(user){
        return res.status(409)
            .json({message: "user is already exist,you can login", success:false});
    }
    //create new users
    const userModel = new UserModel({ name,email,password });
     userModel.password = await bcrypt.hash(password,10);// encrypted password using hash 
     await userModel.save();
     return res.status(201)
            .json({
                message:"signup successfully",
                success:true,
                 userModel: { id: userModel._id, name: userModel.name, email: userModel.email }
            })
    }
    catch(err){
      
        res.status(500)
        .json({message:"internel server error ....",
                    success:false
                })
 }
}
const login =async(req,res)=>{
 try{
    const{name,email,password}=req.body;
    const user= await UserModel.findOne({email});
    const errorMsg='Auth failed email or password is wrong';
    if(!user){
        return res.status(403)
            .json({message: errorMsg, success:false});
    }
    const isPassEqual=await bcrypt.compare(password,user.password);
    if(!isPassEqual){
        return res.status(403)
            .json({message: errorMsg, success:false});
    }
      const jwtToken=jwt.sign(
        {email: user.email , _id:user.id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
      )

     res.status(200)
            .json({message:"login successfully",
                success:true,
            jwtToken,
        email,
    name:user.name})
 }
 catch(err){
    
    res.status(500)
    .json({
        
        message:"internel server login error",
                success:false
                
            })
 }
}
module.exports={
    signup,
    login
}


// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const UserModel = require("../Models/user");

// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "User already exists, you can login", success: false });
//     }

//     // Hash password before save
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new UserModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "Signup successful",
//       success: true,
//     });
//   } catch (err) {
//     console.error("Signup Error:", err); // 👈 Debug log
//     res.status(500).json({
//       message: "Internal server error during signup",
//       success: false,
//       error: err.message, // 👈 send error in response for debug
//     });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { name,email, password } = req.body;

//     const user = await UserModel.findOne({ email });
//     const errorMsg = "Auth failed: email or password is wrong";

//     if (!user) {
//       return res.status(403).json({ message: errorMsg, success: false });
//     }

//     const isPassEqual = await bcrypt.compare(password, user.password);
//     if (!isPassEqual) {
//       return res.status(403).json({ message: errorMsg, success: false });
//     }

//     const jwtToken = jwt.sign(
//       { email: user.email, _id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       success: true,
//       jwtToken,
//       email,
//       name: user.name,
//     });
//   } catch (err) {
//     console.error("Login Error:", err); // 👈 Debug log
//     res.status(500).json({
//       message: "Internal server error during login",
//       success: false,
//       error: err.message, // 👈 send error in response for debug
//     });
//   }
// };

// module.exports = {
//   signup,
//   login,
// };
