const express = require('express');
const {ensureAdminAuth} = require('../config/auth');
const mongoose = require('mongoose')
const {formatDate} = require('../helper/helper');
const router = express.Router()
const { withdrawalMail, rejectWithdrawalMail, depositFailureMail, depositMail} = require('../middleware/nodemailer')

// models
const User = require('../models/User');
const Contact = require('../models/Contact');
const Transaction = require('../models/Transactions');


// dashboard
router.get('/', ensureAdminAuth, async (req,res)=>{
    console.log(req.user)
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
router.get('/transactions', ensureAdminAuth, (req,res)=>{

    try {
        Transaction.find({}, (err, transactions)=>{

            res.render('transactions', {user:req.user, transactions, formatDate, layout: 'LayoutC'})        
        
        })
        
    } catch (err) {
        
    }


    
})

router.post('/statusupdate', ensureAdminAuth,  (req,res)=>{
    const {Id, Name, Type, Email, Amount, Address, statusUpdate} =req.body;
    
    const update = {
        status: statusUpdate
    }
    try {
        Transaction.findByIdAndUpdate(Id, update, (err)=>{
            
            if(Type === 'withdraw'){
                if(statusUpdate === 'success'){
                    withdrawalMail(Email, Amount, Name, Address)
                    req.flash('success_msg', 'status updated')
                    res.redirect('/admindashboard/transactions')
                }
                if(statusUpdate === 'failed'){
                    rejectWithdrawalMail(Email,Amount, Name)
                    req.flash('success_msg', 'status updated')
                    res.redirect('/admindashboard/transactions')
                }
            }
            if(Type === 'Deposit'){
                if(statusUpdate === 'success'){
                    depositMail(Email, Amount, Name)
                    req.flash('success_msg', 'status updated')
                    res.redirect('/admindashboard/transactions')
                }
                if(statusUpdate === 'failed'){
                    depositFailureMail(Email,Amount, Name)
                    req.flash('success_msg', 'status updated')
                    res.redirect('/admindashboard/transactions')
                }
            }

        })
    } catch (err) {
        console.log(err)
    }
    

})


// @@tables
// get
router.get('/contacts', ensureAdminAuth,  (req,res)=>{

    Contact.find((err, contacts)=>{
        if(err){
            console.log(err)
        }else{
            
        res.render('contacts', {user: req.user, formatDate, contacts, layout: 'LayoutC'})
        }
    })

})



// logout
router.get('/logout', ensureAdminAuth, (req,res,next)=>{
    req.logout(err=>{
        if(err){
            console.log(err)
            return next(err)
        }
        req.flash('success_msg', 'logout successful')
        res.redirect('/adminlogin')
    })
})

// image view
router.get('/view/:image', ensureAdminAuth, (req,res)=>{

    res.render('view', {user: req.user, image: req.params.image, layout: 'LayoutC'})
})






module.exports = router;