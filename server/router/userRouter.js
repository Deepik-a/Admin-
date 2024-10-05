const express=require('express')
const router=express.Router()
const userController = require('../controller/userController')
const UserSchema=require('../model/model')
const session=require('express-session')


// const config=require("../../config/config")
// router.use(session({secret:config.sessionSecret,
//     resave: false,            // Do not save session if unmodified
//     saveUninitialized: true, // Do not create session until something is stored
//    }))




const auth=require('../../middleware/auth')

router.get('/',userController.used)
router.get('/login',userController.loginload)
router.post('/login',userController.verifyLogin)


router.get('/register',userController.register)
router.post('/register',userController.registerPost)



router.get('/home',userController.loadHome)
router.get('/logout',userController.logout)



module.exports=router;