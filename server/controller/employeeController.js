const Employee = require("../model/employee.model")


const createEmployee = async(req,res)=>{

    try {
        const {name,age,joiningDate,isActive} = req.body

        const empData = new Employee({
            name,age,joiningDate,isActive
        })
        const savedEmpData = await empData.save()
        return res.status(200).send(savedEmpData)
        
    } catch (error) {
      console.log("error_CreateEmployee")
      return res.status(400).json({msg:error.message})       
    }
    
    
}

const createEmployeesBulk = async (req, res) => {
    try {
        const employeesData = req.body; // Array of employee data
        const savedEmployeesData = await Employee.insertMany(employeesData);
        return res.status(200).send(savedEmployeesData);
    } catch (error) {
        console.log("error_CreateEmployeesBulk", error);
        return res.status(400).json({ msg: error.message });
    }
};


const getEmployee = async(req,res)=>{

    try {
       const employeeList  =    await  Employee.find()
       console.log("employeeList",employeeList)

       return res.status(200).json(employeeList)
        
    } catch (error) {
      console.log("error_CreateEmployee")
      return res.status(400).json({msg:error.message})       
    }
    
    
}

const home=(req,res)=>{
    try {
        res.status(200).send("HOME PAGE")
    } catch (err) {
        res.status(500).json({msg:"serevr error"})
    }
}


module.exports= {
    createEmployee,getEmployee,createEmployeesBulk,home
}