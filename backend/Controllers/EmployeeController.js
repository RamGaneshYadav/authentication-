const express = require("express");
const EmployeeModel = require("../Models/EmployeeModel");
//const { data } = require("react-router-dom");

const createEmployee= async(req,res)=>{
try {
    const body = req.body;
    const image=req.file? req.file?.path : null;
    body.image=image;
    const emps =new EmployeeModel(body);
    await emps.save();
    res.status(201)
        .json({
            message: 'employee created ..',
            success:true,
            EmployeeModel :{ 
                id: emps._id ,
                first: emps.first,
                last:emps.last ,
                father:emps.father,
                age:emps.age,
                email:emps.email,
                phone:emps.phone,
                location:emps.location,
                hobby:emps.hobby,
                image:emps.image,
                },
        });
   }
    catch (err) {
     res.status(500)
        .json({message:"internel server error ....",
                    success:false,
                    error: err
                });
        }
     };

     // update details   


     
const updateEmployeeById= async(req,res)=>{
try {
    const {first,last,phone,age,father,email,location,hobby,image} = req.body;
    const {id}=req.params;

    let updateData={
        first,last,email,father,age,phone,location,hobby,image
    }
    if(req.file){
        updateData.image=req.file.path;
    }
    const  updateEmployee = await EmployeeModel.findByIdAndUpdate(
        id,
        updateData,
        {new: true}

    )
    if(!updateEmployee){
        return res.status(404)
        .json(
            {message:'Employee not found'

            });
    }
    

    res.status(200)
        .json({
            message: 'employee updated ..',
            success:true,
            data:updateEmployee
        });
   }
    catch (err) {
     res.status(500)
        .json({message:"internel server error ....",
                    success:false,
                    error: err
                });
        }
     };

    const getAllEmployee= async(req,res)=>{
try {
      let {page,limit,search} =req.query ;
      page=parseInt(page) || 1;
      limit=parseInt(limit) || 5;

      const skip=(page-1)*limit;
      // page 1= (1-1)*5=0
      //page 2= (2-1)*5=5
      //page 3=(3-1)*5=10


       
      let searchCriteria ={};
      if(search){
        searchCriteria ={
            // first:{
            //     $regex: search,$options: 'i'//case incensitive 
            //     }

                 $or: [
            { first: { $regex: search, $options: 'i' } },
            { last: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            {location:{$regex:search,$options:'i'}},
            {hobby:{$regex:search,$options:'i'}},
            ]

        }
      }
     const totalEmployee=await EmployeeModel.countDocuments(searchCriteria);
      //  If no employee found with search
    if (totalEmployee === 0) {
      return res.status(404).json({
        message: "Data not found",
        success: false,
        data: [],
      });
    }

    const emps =await EmployeeModel.find(searchCriteria)
       .skip(skip)
       .limit(limit)
       .sort( 
        {first : 1 })
        .sort( {location:1})
        .sort({hobby:1})
        .sort({age:1})
        
        
       


       const totalpages =Math.ceil(totalEmployee/limit);

    res.status(200)
        .json({
            message: 'All Employee founded ..',
            success:true,
            data:{
                employee:emps,
                pagination:{
                totalEmployee,
                currentPage:page,
                totalpages,
                pageSize:limit
                }
            }
            
        });
   }
    catch (err) {
     res.status(500)
        .json({message:"internel server error ....",
                    success:false,
                    error: err.message
                });
        }
     };


      const getEmployeeById= async(req,res)=>{
try {
     const {id}=req.params;
    const emp =await EmployeeModel.findOne({_id:id});
    //  emp.save();

    
    if (!emp) {
      return res.status(404).json({
        message: "Employee not found",
        success: false
      });
    }
    res.status(200)
        .json({
            message: ' Get employee Details ..',
            success:true,
            data:emp
            
        });
   }
    catch (err) {
     res.status(500)
        .json({message:"internel server error  ....",
                    success:false,
                    error: err.message
                });
        }
     };


/// delete employee 
     
      const deleteEmployeeById= async(req,res)=>{
try {
     const {id}=req.params;
    const emp =await EmployeeModel.findByIdAndDelete({_id:id});
    
     if (!emp) {
      return res.status(404).json({
        message: "Employee not found",
        success: false
      });
    }

    res.status(200)
        .json({
            message: ' employee Deleted',
            success:true,
          
        });
   }
    catch (err) {
     res.status(500)
        .json({message:"internel server error  ....",
                    success:false,
                    error: err.message
                });
        }
     };


     module.exports={
    createEmployee,getAllEmployee,getEmployeeById,deleteEmployeeById,updateEmployeeById
};
