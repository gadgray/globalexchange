const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport')
const serialize = require('../middleware/passport_Serialize')
const deserialize =  require('../middleware/passport_deserialize')

const User = require('../models/User');
const Admin = require('../models/Admin');

module.exports = {
    UsersAuth: ()=>{
        passport.use('user_local', new LocalStrategy({usernameField: 'email'},
            (email, password, done)=>{
                console.log('user_local')
                try {
                    User.findOne({email:email}, (err, user)=>{
                        if(err){
                            return done(err, false)
                        }
                        if(!user){
                            // req.flash('error_msg', 'You do not have an account')
                            return done(null, false, {message : 'You do not have an account'})
                        }
                        
                        bcrypt.compare(password, user.password, (err, isMatch)=>{
    
                            if(err){
                                console.log(err)
                            }
    
                            if(isMatch){
                                console.log('donnnnnn')
                                return done(null, user)
    
                            }else{
                                // req.flash('error_msg', 'incorrect password')
                                return done(null, false, {message: 'incorrect password'})
                            }
                            
                        })
    
    
                    })
                } catch (err) {
                    req.flash('error_msg', err)
                }
                
            }

        ))
            serialize
            deserialize
        // passport.serializeUser(function(user, done) {
        //     console.log(user._id)
        //     return done(null, user._id)
        //   });
          
        //   passport.deserializeUser(function(_id, done) {
        //     User.findById(_id, (err, users)=>{
        //         console.log(users)
        //         return done(err, users)
                
        //     })
        //   });
    
    },

    AdminAuth: ()=>{

        passport.use('admin_local', new LocalStrategy(
            (username, password, done)=>{
                console.log('Admin_local')
                try {
                    Admin.findOne({userName:username}, (err, user)=>{
                        if(err){
                            return done(err, false,{message: err})
                        }
                        if(!user){
                            // req.flash('error_msg', 'unauthorized user')
                            return done(null, false, {message : 'Unauthorized personnel'})
                        }
                        bcrypt.compare(password, user.password, (err, isMatch)=>{
    
                            if(err){
                                console.log(err)
                            }
    
                            if(isMatch){
                                return done(null, user)
    
                            }else{
                                // req.flash('error_msg', 'incorrect password')
                                return done(null, false, {message: 'incorrect password'})
                            }
                            
                        })
    
    
                    })
                    
                } catch (error) {
                    req.flash('error_msg', err)
                    console.log(err)
                }
                
            }

        ))
            serialize
            deserialize
        
       
        // passport.serializeUser(function(user, done) {
            
        //     return done(null, user.id)
        //   });
          
        //   passport.deserializeUser(function(id, done) {
        //     Admin.findById(id, (err,user)=>{

        //             return done(err, user)
                
                
        //     })
        //   });
    
    },
}
