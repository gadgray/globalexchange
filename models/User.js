const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountBalance:{
        type: String,
    },
    totalBalance:{
        type: String,
    },

    miningBalance:{
        type: String,
    },
    plan:{
       type: String,
    }, 
    profileImg:{
        type: String,
     }, 
    createdAt: {
        type: Date,
        default: Date.now()
    },

})

const User = mongoose.model('User', userSchema);

module.exports = User;