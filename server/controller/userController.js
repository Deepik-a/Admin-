const Users = require("../model/model");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
    throw new Error("Password hashing failed");
  }
};



//login details

const used = (req, res) => {
  try {
      res.redirect('/login')
  } catch (err) {
      console.log('Error During user route');
  }
}

//loginload
const loginload = async (req, res) => {
  try {
    if (req.session.user) {
    res.redirect("/home");
  } 
  else{
      res.render('user_login')
        }
  } 
  catch (error) {
    console.log(error.message);
  }
};

//verifyLoad

const verifyLogin = async (req, res) => {
  try {
      const checkUser = await Users.findOne({ email: req.body.email })
      if (checkUser === null) {
          res.render('user_login',{title:"Invalid email or password'"})
      } else {
          const passwordCheck = await bcrypt.compare(req.body.password, checkUser.password)
          if (passwordCheck) {
              req.session.user = req.body.email
             res.render('home')
          } else {
             
              res.render('user_login',{title:"Invalid email or password'"})
          }
      }
  } catch (err) {
      console.log(`Error on login Post ${err}`);
  }

}
    


const register = async (req, res) => {
  try {
    if (req.session.user) {
    res.render("home");
  } else{
    res.render('user_signup',{ title: "Register"})
  } 
  
}
  catch (error) {
    console.log(error.message);
  }
};







const registerPost = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: spassword,
      isvarified: 0,
      is_Admin: 0,
    });

    // console.log(req.body.email)

    // Use the `save` method on the user instance
    const userData = await user.save();

    if (userData) {
      res.render("user_signup", { title: "Your registration is successful" });
    } else {
      res.render("user_signup", { title: "Your registration has failed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};



// const verifyLogin = async (req, res) => {
//   try {
//     const email = req.body.email;
//     console.log(email);
//     const password = req.body.password;
//     const userData = await Users.findOne({ email: email });
//     console.log(userData);

//     // if (userData) {
//     //   const passwordMatch = await bcrypt.compare(password, userData.password);

//     //   if (passwordMatch) {
//     //     if (userData.isvarified === 0) {
//     //       res.redirect("user_login", { title: "Login sucess" });
//     //     } else {
//     //       req.session.user_id = userData._id;
//     //       res.redirect("/home");
//     //     }
//     //   } else {
//     //     res.redirect("user_login", { title: "Email and Password is incorrect" });
//     //   }
//     // } else {
//     //   res.redirect("user_login", { title: "Email and Password is incorrect" });
//     // }
//     if (userData) {
//       const check = await bcrypt.compare(password, userData.password);

//       if (check && userData.isvarified === 0 ) {
//         req.session.user_id = userData._id;
//         res.render("home");
//       } else {
//         res.redirect("/login");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };



const loadHome = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.log(error.message);
  }
};


//logout
const logout = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.log(`Error during session logout`);
      } else {
          res.render('user_login')
      }
  })
}











module.exports = {
  used,
  register,
  registerPost,
  loginload,
  verifyLogin,
  loadHome,
  logout
};
