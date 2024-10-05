const isLogin = async (req, res, next) => {
    try {

        if (req.session.user_id) {
            next(); // User is logged in, proceed to the next middleware
        } else {
         res.redirect('/'); // User not logged in, redirect to login page
        }
    } catch (error) {
        console.log(error.message);
         res.status(500).send("Internal Server Error"); // Handle errors
    }
};



//-------------------------------

const isLogout = async (req, res, next) => {
    try {
        if (req.session.user_id) {
             res.redirect('/home'); // User is logged in, redirect to home page
        } else {
            next(); // User is not logged in, proceed to the next middleware
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); // Handle errors
    }
};


module.exports={
    isLogin,
    isLogout
}