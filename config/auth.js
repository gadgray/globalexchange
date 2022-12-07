const passport = require('passport')
module.exports = {
    ensureAdminAuth: function (req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'login to get access');
        res.redirect('/adminlogin')
    },
    ensureUserAuth: function (req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'unauthorized access login');
        res.redirect('/login')
    }

}