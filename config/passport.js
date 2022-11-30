const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Admin = require('../models/Admin');

module.exports = {
    UsersAuth: async (passport)=>{
        passport.use('user_local', new LocalStrategy({usernameField: 'email'},
            (email, password, done)=>{
                console.log('user_local')
                User.findOne({email:email}, async (err, user)=>{
                    if(!user){
                        
                        return done(null, false, {message : 'You do not have an account'})
                    }
                    await bcrypt.compare(password, user.password, (err, isMatch)=>{

                        if(err){
                            console.log(err)
                        }

                        if(isMatch){
                            return done(null, user)

                        }else{
                            return done(null, false, {message: 'incorrect password'})
                        }
                        
                    })


                })
            }

        ))
        passport.serializeUser(function(user, done) {
            
            return done(null, user.id)
          });
          
          passport.deserializeUser(async function(id, done) {
            await User.findById(id, (err,user)=>{
               
                    return done(err, user)
                
                
            })
          });
    
    },
    AdminAuth: async (passport)=>{
        passport.use('admin_local', new LocalStrategy(
            (username, password, done)=>{
                console.log('Admin_local')
                Admin.findOne({userName:username}, async (err, user)=>{
                    if(!user){
                        req.flash('error_msg', 'You do not have an account')
                        return done(null, false, {message : 'You do not have an account'})
                    }
                    await bcrypt.compare(password, user.password, (err, isMatch)=>{

                        if(err){
                            console.log(err)
                        }

                        if(isMatch){
                            return done(null, user)

                        }else{
                            req.flash('error_msg', 'incorrect password')
                            return done(null, false, {message: 'incorrect password'})
                        }
                        
                    })


                })
            }

        ))
        passport.serializeUser(function(user, done) {
            
            return done(null, user.id)
          });
          
          passport.deserializeUser(async function(id, done) {
            await Admin.findById(id, (err,user)=>{
               
                    return done(err, user)
                
                
            })
          });
    
    },
}
