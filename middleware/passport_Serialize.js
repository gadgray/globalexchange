const passport = require('passport');
const mongoose = require('mongoose')

// models
const User = require('../models/User');
const Admin = require('../models/Admin');

const serializer = passport.serializeUser( function(user,done){

    return done(null, user._id)
})


module.exports = serializer;