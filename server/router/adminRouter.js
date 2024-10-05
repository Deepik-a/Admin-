const express=require('express')
const route=express.Router()
const adminSection=require('../../middleware/adminSection')

// const services=require('../service/render')
const adminController=require('../controller/adminController')
const dashboardController=require('../controller/dashboardController')


 route.get('/',adminController.admin)
 route.get('/admin-login',adminController.login)
 route.post('/admin-login',adminController.loginPost)
 route.get('/dashboard',adminSection,dashboardController.dashboard);




route.get('/edit-user/:id',adminSection,dashboardController.editUser)
route.post('/edit-user/:id',adminSection,dashboardController.editUserPost)
route.get('/delete-user/:id',dashboardController.deleteUser)
route.get('/add-user',adminSection,dashboardController.addUser)
route.post('/add-user',dashboardController.addUserPost)


route.get('/logout',adminController.logout)

   
module.exports=route;