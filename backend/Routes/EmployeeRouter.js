const { createEmployee, getAllEmployee, getEmployeeById ,deleteEmployeeById, updateEmployeeById} = require('../Controllers/EmployeeController');
const { cloudinaryFileUploader } = require('../Middlewares/fileuploader');

const router =require('express').Router();
router.get('/', getAllEmployee);


router.post('/',cloudinaryFileUploader.single('image'), createEmployee); //fisrt call a middleware
router.put('/:id',cloudinaryFileUploader.single('image'), updateEmployeeById);  

router.get('/:id', getEmployeeById);

router.delete('/:id', deleteEmployeeById);

// router.put('/:id', updateEmployeeById);

  module.exports = router;