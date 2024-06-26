const express = require('express');
const Router = express.Router();
const EmployeeController = require('../controller/employeeController')

Router.post('/employee/new',EmployeeController.createEmployee)
Router.post('/employee/bulk',EmployeeController.createEmployeesBulk)


Router.get('/employee',EmployeeController.getEmployee)
Router.get('/',EmployeeController.home)
Router.get('/*',EmployeeController.notFound)

module.exports = {Router}