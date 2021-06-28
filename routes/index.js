const express = require('express');
const router = express.Router();


const { Employee } = require('../models/employee');


//get all employeess 
router.get('/api/employees', (req, res) => {
    Employee.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// save employee
router.post('/api/employee/add', (req,res) => {
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    });
    emp.save((err,data) => {
        res.status(200).json({ code:200, message: 'Employee Added Successfully',
    addEmployee:data })
    })
});

//get single employee
router.get('/api/employee/:id', (req,res) =>{
    Employee.findById(req.params.id, (err,data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

//update employee
router.put('/api/employee/edit/:id',(req, res) =>{
    const emp = {
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, { $set:emp}, {new:true}, (err,data) => {
        if(!err){
            res.status(200).json({ code:200, message: 'Employee updated successfully',
            updateEmployee: data})
        } else {
            console.log(err);
        }
    });
});

//delete employee
router.delete('/api/employee/:id', (req,res) =>{
    Employee.findByIdAndRemove(req.params.id, (err,data) =>{
        if(!err) {
            res.status(200).json({ code:200, message: 'Employee Deleted Successfully',
            deleteEmployee:data})
        }
    });
});

module.exports = router;