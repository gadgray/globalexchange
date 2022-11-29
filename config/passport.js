const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Admin = require('../models/Admin');

module.exports = {
    UsersAuth: async (passport)=>{
        passport.use(new LocalStrategy({usernameField: 'email'},
            (email, password, done)=>{
                
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
    
    },
    AdminAuth: async (passport)=>{
        passport.use(new LocalStrategy(
            (username, password, done)=>{
                
                Admin.findOne({userName:username}, async (err, user)=>{
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
    
    },
}
