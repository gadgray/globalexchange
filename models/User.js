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
        type: Number,
    },
    totalBalance:{
        type: Number,
    },

    miningBalance:{
        type: Number,
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