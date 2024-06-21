const mongoose  = require('mongoose');

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type :Number,
        required:true
    },
    joiningDate: {
        type: String,
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Joining date must be in YYYY-MM-DD format']
    },
    isActive:{
        type:Boolean,
        required:true
    }
})

module.exports= mongoose.model('Employee',employeeSchema)