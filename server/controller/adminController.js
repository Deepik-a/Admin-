var Userdb = require('../model/model');

// // create and save new user
// exports.create = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new user
//     const user = new Userdb({
//         name : req.body.name,
//         email : req.body.email,
//         gender: req.body.gender,
//         status : req.body.status
//     })

//     // save user in the database
//     user
//         .save(user)
//         .then(data => {
//             //res.send(data)
//             res.redirect('/add-user');
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });

// }

// // retrieve and return all users/ retrive and return a single user
// exports.find = (req, res)=>{

//     if(req.query.id){
//         const id = req.query.id;

//         Userdb.findById(id)
//             .then(data =>{
//                 if(!data){
//                     res.status(404).send({ message : "Not found user with id "+ id})
//                 }else{
//                     res.send(data)
//                 }
//             })
//             .catch(err =>{
//                 res.status(500).send({ message: "Erro retrieving user with id " + id})
//             })

//     }else{
//         Userdb.find()
//             .then(user => {
//                 res.send(user)
//             })
//             .catch(err => {
//                 res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
//             })
//     }

    
// }

// // Update a new idetified user by user id
// exports.update = (req, res)=>{
//     if(!req.body){
//         return res
//             .status(400)
//             .send({ message : "Data to update can not be empty"})
//     }

//     const id = req.params.id;
//     Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message : "Error Update user information"})
//         })
// }

// // Delete a user with specified user id in the request
// exports.delete = (req, res)=>{
//     const id = req.params.id;

//     Userdb.findByIdAndDelete(id)
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
//             }else{
//                 res.send({
//                     message : "User was deleted successfully!"
//                 })
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message: "Could not delete User with id=" + id
//             });
//         });
// }




const admin = (req, res) => {
    try {
        if (req.session.admin) {
            res.render('admin')
        } else {
            res.render('adminlogin')
        }
    } catch (err) {
        console.log(`Error redirect to admin login`);
    }
}


const login = (req, res) => {
    try {
        if (req.session.admin) {
            res.render('admin')
        } else {
            res.render('adminlogin', { title: "ADMIN login"})
        }
    } catch (err) {
        console.log(`Error during admin login page render ${err}`);
    }
}

const loginPost = (req, res) => {
    try {
        if (req.body.email === "admin@gmail.com" && req.body.password === "admin123") {
            req.session.admin = req.body.email
            res.render('admin')
        } else {
            res.render('adminlogin',{title:"Invalid email and password"})
        }
    } catch (err) {
        console.log(`Error during admin login ${err}`);
    }
}

const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(`Error during session destroy in admin ${err}`);
            } else {
                res.render('admin')
            }
        })
    } catch (err) {
        console.log(`Error while admin logout ${err}`);
    }
}













module.exports = {
    admin,
   login,
   loginPost,
   logout
}