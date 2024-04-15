const Router = express.Router();
const EmployeeController = require('./controller/employeeController')

Router.post('/empolyee/add',EmployeeController.createEmployee)