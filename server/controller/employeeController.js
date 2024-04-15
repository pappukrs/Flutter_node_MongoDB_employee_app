const Employee = require("../model/employee.model")


const createEmployee = async(req,res)=>{

    try {
        const {name,age,joiningDate,isActive} = req.body

        const empData = new Employee({
            name,age,joiningDate,isActive
        })
        
    } catch (error) {
      console.log("error_CreateEmployee")
      return res.satus(400).json({msg:error.message})       
    }
    
    
}

const getEmployee = async(req,res)=>{

    try {
       const employeeList  =     Employee.find()
       console.log("employeeList",employeeList)

       res.satus(200).json(employeeList)
        
    } catch (error) {
      console.log("error_CreateEmployee")
      return res.satus(400).json({msg:error.message})       
    }
    
    
}


module.exports= {
    createEmployee,getEmployee
}