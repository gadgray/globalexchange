const passport = require('passport')
module.exports = {
    ensureAdminAuth: function (req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Session expired');
        res.redirect('/adminlogin')
    },
    ensureUserAuth: function (req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'Session expired');
        res.redirect('/login')
    }

}