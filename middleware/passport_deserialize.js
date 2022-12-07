const passport = require('passport');
const mongoose = require('mongoose')

// models
const User = require('../models/User');
const Admin = require('../models/Admin');


const deserialize = passport.deserializeUser(function(id, done){
    Admin.findById(id, (err,user)=>{

        if(user){
            return done(err, user)
        }

    })      
    
    User.findById(id, (err,user)=>{

        if(user){
            return done(err, user)
        }

    }) 
})

module.exports = deserialize;


