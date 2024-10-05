function checkAdmin(req,res,next){
    if(req.session.admin){
        next()
    }else{
        res.render('adminlogin')
    }
}

module.exports=checkAdmin