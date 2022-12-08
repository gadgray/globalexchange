const express = require('express');
const mongoose = require('mongoose');
const {ensureUserAuth} = require('../config/auth');
const {formatDate, transactionID} = require('../helper/helper');
const formidiable = require('formidable');
const router = express.Router()
const fs = require('fs');
const path = require('path')
const {depositReqMail, withdrawalReqMail} = require('../middleware/nodemailer')



// models
const User = require('../models/User');
const Coin = require('../models/Coin');
const Transaction = require('../models/Transactions');

// dashboard
router.get('/', ensureUserAuth, (req, res)=>{

    Transaction.find({user_Id: req.user._id}, (err, transactions)=>{

        if(!err){
            
            res.render('dashboard', {user: req.user, transactions, formatDate, layout: 'LayoutC'});
        }

    })


})



// @@deposit
// get
router.get('/deposit', ensureUserAuth, async (req,res)=>{

    res.render('deposit', {user: req.user, layout: 'LayoutC'});
})

// get gateways     
router.post('/deposit/gateway', ensureUserAuth, (req,res)=>{
    const {Gateway} = req.body;

    const coin = new Coin({
        tokenName: 'USDT',
        networks: 
                {
                name: 'TRC20',
                address: 'dad23r42ssfgsffwr4wrq3r4r43r3r'
                },
                
            
        }
    )

    try {
        Coin.findOne({tokenName: Gateway},(err, token)=>{
            const network = token.networks

            res.render('deposit', {
                layout: 'LayoutC',
                user: req.user,
                Gateway,
                network,
            })
        })

    } catch (err) {
        console.log(err);
    }
})

router.post('/deposit/networks', ensureUserAuth,(req,res)=>{

    const{Network, Gateway} = req.body;
    try {
        Coin.findOne({tokenName: Gateway}, (err, network)=>{
            console.log(Network)
            res.render('deposit', {
                layout: 'LayoutC',
                user: req.user,
                Gateway,
                Network,
                network: network.networks,
            })

        })
    } catch (err) {
        console.log(err)
    }
    
})


router.post('/deposit',ensureUserAuth, (req,res)=>{

    const form = new formidiable.IncomingForm()
    
        form.parse(req,(err, fields, files)=>{
            const transId = transactionID()
            const oldpath = files.proofImg.filepath;
            const newpath = path.join(__dirname + '//..//public//uploads//transactions', files.proofImg.originalFilename)

            try {
                fs.rename(oldpath, newpath, (err)=>{

                    console.log(fields)
                    const transaction = new Transaction({
        
                        user_Id: fields.Id,
                        transactionID: transId,
                        type: 'Deposit',
                        amount: fields.Amount,
                        gateway: fields.GateWay,
                        network: fields.Network,
                        recieverAddress: fields.Address,
                        status: 'pending',
                        proofImg: files.proofImg.originalFilename,
                    })

                    console.log(transaction)
                    transaction.save((err)=>{
                        if(err){
                            req.flash('error_msg', 'upload error');
    
                            res.render('deposit', {
                                layout: 'LayoutC',
                                user: req.user,
                                Gateway: fields.Gateway,
                                Network: fields.Network,
                            })
                        }else{
                            depositReqMail(req.user.email, transaction.amount, req.user.firstName)
                            req.flash('success_msg', 'request submitted successfully')
                            req.flash('success_msg', 'account will be updated with 24hrs')
                            res.redirect('/dashboard/deposit')
                        }
                    })

                })
                    
            } catch (err) {
                console.log(err);
            }
           
    
            
    

        })
    
   
})

// end of deposit


// @@withdraw
//get
router.get('/withdraw', ensureUserAuth,  (req,res)=>{

    res.render('withdraw', {user: req.user, layout: 'LayoutC'});
})

// get gateways     
router.post('/withdraw/gateway', ensureUserAuth, (req,res)=>{
    const {Gateway} = req.body;

    try {
        Coin.findOne({tokenName: Gateway},(err, token)=>{
            const network = token.networks

            res.render('withdraw', {
                layout: 'LayoutC',
                user: req.user,
                Gateway,
                network,
            })
        })

    } catch (err) {
        console.log(err);
    }
})

router.post('/withdraw/request', ensureUserAuth,(req,res)=>{

    const transId = transactionID()

    const transaction = new Transaction({
        
        user_Id: req.body.Id,
        transactionID: transId,
        type: 'withdraw',
        amount: req.body.Amount,
        gateway: req.body.Gateway,
        network: req.body.Network,
        recieverAddress: req.body.Address,
        status: 'pending',
    })

    try {
        transaction.save((err)=>{
            withdrawalReqMail(req.user.email, transaction.amount, req.user.firstName, transaction.recieverAddress)
            req.flash('success_msg', 'withdrawal request sent successfully');
            res.redirect('/dashboard/transactionslog')
        })
    } catch (err) {
        console.log(err)
    }
  
    
})


// @@tables
// get



// @@edit profile

router.get('/edit',ensureUserAuth,  (req,res)=>{


    res.render('edit', {
        user: req.user,
        layout: 'LayoutC',
    })
})

router.post('/edit',ensureUserAuth,  (req,res)=>{

    const {id, phoneNo}= req.body;

    const update = {

        phoneNo
    }
    try {
        User.findByIdAndUpdate(id, update, ()=>{

            req.flash('success-msg', 'profile updated');
            res.redirect('/dashboard/edit')
        })
    } catch (error) {
        console.log('err')
    }
    
    console.log(update)

    
})

// upload image
router.post("/upload", ensureUserAuth, (req, res)=>{

    let forms = new formidiable.IncomingForm()
    forms.parse(req, (err, fields, files)=>{
        let oldpath = files.profileImg.filepath;
        let newpath =  path.join(__dirname + '//..//public//uploads//profileimages', files.profileImg.originalFilename);
        try {
            fs.rename(oldpath, newpath, ()=>{

                const update = {

                    profileImg: files.profileImg.originalFilename,
                }

                User.findByIdAndUpdate(fields.id, update, (err=>{
                    if(err){
                        return err;
                    }
                    req.flash('success_msg', 'image upload sucessfully')
                    res.redirect('/dashboard/edit')
                }) )
                
            })
                
        } catch (error) {
            
        }
        
    })

})

// end of edit



// transaction Logs

router.get('/transactionslog',ensureUserAuth, (req,res)=>{

    try {
        Transaction.find({user_Id: req.user._id}, (err, transactions)=>{
            console.log(transactions)
            res.render('transactionlog', {
                layout: 'layoutC',
                transactions,
                user: req.user,
                formatDate,
            })
            // res.send(transactions)
        })
    } catch (err) {
        console.log(err)
    }
})









module.exports = router;