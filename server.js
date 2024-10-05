// const mongoose=require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/mongo")
 //--------------------------------------------------------------

 const express=require("express")
 const app=express();
 const dotenv=require("dotenv")
 const morgan=require('morgan')
//  const bodyparser=require('body-parser')

 const path=require('path')
 const session=require('express-session')
 const flash=require('connect-flash')
 const connectDB=require('./server/database/connection')
 const config=require("./config/config")
 const {v4 : uuidv4 } = require('uuid')
 const nocache=require('nocache')

 //------------------------------------------------------

app.set("view engine","ejs")//set view engine

//----------------------------------------
dotenv.config({path:'config.env'})
const port=process.env.port||8080

//--------------------------------------------------

app.use(morgan('tiny'))//log request

//-------------------------------------------------

app.use(nocache())


//------------------------------------------------------------


app.use(express.json())
app.use(express.urlencoded({extended:true}))



//----------------------------==========================
app.use(session({
    secret:uuidv4(),
    resave: false,            // Do not save session if unmodified
    saveUninitialized: true, // Do not create session until something is stored
   }))



//------------------------------------------------------
// Set up connect-flash
app.use(flash());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.successMessage = req.flash('successMessage');
    next();
});





//-----------------------------------------------------




//-----------------------------------------------------------------------
app.use('/assets/css',express.static(path.resolve(__dirname,"assets/css")))
// app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
// app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// //first route
// app.get('/',(req,res)=>{
//     res.redirect('/signup')
// })


//------------------------------------------------------------------------------

const userRoute=require('./server/router/userRouter')
app.use('/',userRoute)

const adminRoute=require('./server/router/adminRouter')
app.use('/',adminRoute)



const mongoose = require("mongoose");
 mongoose.connect('mongodb://localhost:27017/mydatabase')
// app.use(express.static(path.resolve(__dirname,"assets")))


// app.use('/assets',express.static("assets"))



//-----------------------------------------------------------------------

// app.use('/',require('./server/router/adminRouter'))
// app.use('/hai',(req,res,next)=>{
//     console.log(123456789),next()
// },
//   require('./server/router/userRouter'))

//------------------------------------------------------------------------
 
//mongoDB connection
// const uri = 'mongodb://username:password@host:port/database';


// connectDB();



//---------------------------------------------------------






app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})