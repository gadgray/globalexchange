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
const Coin = require('../models/Coin');


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

// @@ addcoins
router.get('/addcoin', ensureAdminAuth,  (req,res)=>{

    try {
        Coin.find({}, (err, coins)=>{

            
            res.render('coin', {user: req.user, coins, layout: 'LayoutC'})
        
        })

    } catch (err) {
        console.log(err)
    }
    

})
router.post('/addcoin', ensureAdminAuth,  (req,res)=>{
 console.log(req.body)
 const{Name, Network, Address} = req.body;
    try {
        
        Coin.findOne({tokenName: Name}, (err, coin)=>{
            const token = new Coin({
                tokenName: Name,
                networks : [
                    {name: Network,
                    address: Address}
                ]
            })
            if(!coin){
                
                token.save((err)=>{
                    if(!err){
                        req.flash('success_msg', 'Coin Added')
                        res.render('coin', {user: req.user, layout: 'LayoutC'})
                    }
                })
            }else{
                const network ={
                    name: Network,
                    address: Address
                }
                Coin.updateOne(
                    {tokenName: Name},
                    {$push: {networks: network}},(err)=>{
                        if(!err){
                            req.flash('success_msg', 'network add Added')
                            res.render('coin', {user: req.user, layout: 'LayoutC'})
                        }
                    }
                )
            }
        })
        // res.send(req.body)
        // res.render('coin', {user: req.user, layout: 'LayoutC'})
        
        
    } catch (err) {
        console.log(err)
    }
    

})

router.post('/statusupdate', ensureAdminAuth, (req,res)=>{
    const {Id, userId, Type, Amount, Address, statusUpdate} =req.body;
    

    try {
        Transaction.updateOne({_id: Id}, {
            $set: {status : statusUpdate}
        }, (err)=>{
            if(!err){
                
                User.findOne({_id: userId}, (err, user)=>{
                    
                    const {email, firstName} = user;

                    if(!err){

                        if(Type === 'withdraw'){
                            if(statusUpdate === 'success'){
                                const newAvailableBal = user.accountBalance - ((Amount *10)/10);
                                User.updateOne({_id: userId},{$set: {
                                    
                                    accountBalance: newAvailableBal,
                                    totalBalance: user.totalBalance - ((Amount *10)/10) ,
                                    
                                }}, (err)=>{
                                    console.log('updated');
                                })
                                withdrawalMail(email, Amount, firstName, Address)
                                req.flash('success_msg', 'status updated')
                                res.redirect('/admindashboard/transactions')
                            }
                            if(statusUpdate === 'failed'){
                                rejectWithdrawalMail(email,Amount, firstName)
                                req.flash('success_msg', 'status updated')
                                res.redirect('/admindashboard/transactions')
                            }
                        }
                        if(Type === 'Deposit'){
                            if(statusUpdate === 'success'){
                                
                                User.updateOne({_id: userId},{$set: {
                                    
                                    totalBalance: user.totalBalance + ((Amount *10)/10),
                                    accountBalance: user.accountBalance + ((Amount *10)/10),
                                }}, (err)=>{
                                    console.log('updated');
                                })
                                depositMail(email, Amount, firstName)
                                req.flash('success_msg', 'status updated')
                                res.redirect('/admindashboard/transactions')
                            }
                            if(statusUpdate === 'failed'){
                                depositFailureMail(email,Amount, firstName)
                                req.flash('success_msg', 'status updated')
                                res.redirect('/admindashboard/transactions')
                            }
                        }
                    }
                    
                    
                    
        
                })
            }
            console.log('done')
        })

        
    } catch (err) {
        console.log(err)
        req.flash('error_msg', 'error updating')
        res.redirect('/admindashboard/transactions')
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