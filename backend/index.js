const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
require('dotenv').config();
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const EmployeeRouter = require('./Routes/EmployeeRouter');




// require db file
require('./Models/db');
const PORT = process.env.PORT;
app.use(bodyParser.json());
// Middlewares
app.use(cors());
app.use(express.json()); // JSON body parse
app.use(express.urlencoded({ extended: true })); // form data parse

// Routes
app.get('/ping', (req, res) => {
    res.send('Hello connector');
});
app.use('/auth', AuthRouter);// Routes should be after body-parser
app.use('/products', ProductRouter);
app.use('/auth/employee',EmployeeRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});






// const express =require("express");
// const app =express();
// const cors=require('cors');
// require('dotenv').config();
// const AuthRouter=require('./Routes/AuthRouter');
// const bodyParser= require('body-parser');


// // require db file
// require('./Models/db');
// const PORT =process.env.PORT ||8080;

// app.get('/ping',(req,res) =>{
//     res.send('Hello connector');
// });
//  app.use('/auth',AuthRouter);
//  app.use(cors());
// //use a bodyparser
// // app.use(bodyParser.json());

// app.use(express.json())
// app.use(express.urlencoded({ extended: true })); 

// //use listen port
// app.listen(PORT,()=>{
//     console.log(`Server is running  on ${PORT}`)
// })
