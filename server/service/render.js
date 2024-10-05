// const axios = require('axios');


// exports.homeRoutes = (req, res) => {
//     // Make a get request to /api/users
//     axios.get('http://localhost:6999/api/users')
//         .then(function(response){
//             res.render('index', { users : response.data });
//         })
//         .catch(err =>{
//             res.send(err);
//         })

    
// }

// exports.add_user = (req, res) =>{
//     res.render('adduser');
// }

// exports.update_user = (req, res) =>{
//     axios.get('http://localhost:6999/api/users', { params : { id : req.query.id }})
//         .then(function(userdata){
//             res.render("updateuser", { user : userdata.data})
//         })
//         .catch(err =>{
//             res.send(err);
//         })
// }