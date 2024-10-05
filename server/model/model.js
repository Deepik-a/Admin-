
const mongoose=require('mongoose')
const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, 
    },
    password:{
        type:String,
        required:true
    },
    
    isvarified:{
        type:Number,
        required:true
    },
    is_Admin:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('users',schema)//model is a method of mongoose
//schema variable specifies the shape of the document

