const Users=require('../model/model')
const bcrypt = require('bcrypt')

const dashboard = async (req, res) => {
    try {
        // user search 
        const userSearch = req.query.search || '';
        const userDetails = await Users.find({ name: { $regex: userSearch, $options: 'i' } })
        if (userDetails.length === 0) {
            req.send('No user registration details is available')
        }
        res.render('admin')
    } catch (err) {
        console.log(`Error rendering dashboard ${err}`);
    }
}

const editUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const userData = await Users.findById(userID);
        
        if (!userData) {
            return res.status(404).send('User not found');
        }

        res.render('edit', { 
            title: "Edit User", 
            user: userData 
        });
    } catch (err) {
        console.log(`Error during user editing: ${err}`);
        res.status(500).send('Internal Server Error');
    }
}

const editUserPost = async (req, res) => {
    try {
        const userID = req.params.id;
        const updateStatus = await Users.findByIdAndUpdate(userID, { 
            name: req.body.editName,
            email: req.body.editEmail,
            gender: req.body.gender,
            status: req.body.status
        }, { new: true });

        if (!updateStatus) {
            req.flash("errorMessage", 'User data not updated, please try again');
            return res.redirect('/edit-user/' + userID);
        }

        req.flash("successMessage", 'User data updated successfully');
        res.redirect('/admin'); // Redirect to admin page or wherever appropriate
    } catch (err) {
        console.log(`Error during user data updation: ${err}`);
        req.flash("errorMessage", 'Internal Server Error');
        res.redirect('/edit-user/' + req.params.id);
    }
}

const addUser = (req, res) => {
    try {
        res.render('adduser')
    } catch (err) {
        console.log(`Error rendering add user page ${err}`);
    }
}
const addUserPost = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        }
        const checkUserExist = await userSchema.find({ email: req.body.email })
        if (checkUserExist.length === 0) {
            Users.insertMany(userData).then((result) => {
                req.flash('errorMessage', "User Registration is successful")
                return res.render('admin')
            }).catch((err) => {
                console.log(`Error while inserting new user ${err}`);
            })
        } else {
            req.flash('errorMessage', 'User already exist')
            return res.render('admin')
        }
    } catch (err) {
        console.log(`Error while adding user ${err}`);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const deleteStatus = await Users.findByIdAndDelete(userID)
        if (deleteStatus === undefined) {
            req.flash("errorMessage", 'User data cannot delete at the moment please try again')
            res.render('admin')
        } else {
            req.flash("errorMessage", 'user deleted')
            res.render('admin')
        }
    } catch (err) {
        console.log(`Error during user data delete ${err}`);
    }
}



module.exports={
    dashboard,
    editUser,
    editUserPost,
    addUser,
    addUserPost,
    deleteUser 
}