const express = require('express');
// const {ensureAdminAuth} = require('../config/auth');
const mongoose = require('mongoose')
const {formatDate} = require('../helper/helper');
const router = express.Router()

// models
const User = require('../models/User');
const Contact = require('../models/Contact');


// dashboard
router.get('/', async (req,res)=>{
    try {
        await User.find((err, users)=>{
            res.render('admindashboard', {user: req.user, formatDate, users, layout: 'LayoutC'})
            
        })
    } catch (err) {
            req.flash('error_msg', 'unable to retrive users');
            
    }
    

    
})

//@@transactions
// get
router.get('/transactions', (req,res)=>{



    res.render('transactions', {user:req.user, layout: 'LayoutC'})
})


// @@tables
// get
router.get('/contacts',  (req,res)=>{

    Contact.find((err, contacts)=>{
        if(err){
            console.log(err)
        }else{
            
        res.render('table', {user: req.user, formatDate, contacts, layout: 'LayoutC'})
        }
    })

})



// logout
router.get('/logout', (req,res,next)=>{
    req.logout(err=>{
        if(err){
            console.log(err)
            return next(err)
        }
        req.flash('success_msg', 'logout successful')
        res.redirect('/adminlogin')
    })
})






module.exports = router;