
module.exports = {
    ensureAdminAuth: function (req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_message', 'login to get access');
        res.redirect('/adminlogin')
    },
    ensureUserAuth: function (req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_message', 'unauthorized access login');
        res.redirect('/login')
    }

}