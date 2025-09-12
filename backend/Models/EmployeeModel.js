const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  EmployeeSchema = new Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,   
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    image:{
        type: String,
    },
});


const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
