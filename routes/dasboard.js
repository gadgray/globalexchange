const express = require('express');



const router = express.Router()



// models
const User = require('../models/User');

// dashboard
router.get('/', async (req,res)=>{

    try {
        await User.find((users)=>{
            
            res.render('dashboard', {user: req.user, users, layout: 'LayoutB'});
        })
    } catch (err) {
        console.log(err)
    }
    


    
})



// @@deposit
// get
router.get('/deposit', async (req,res)=>{

    res.render('deposit', {layout: 'LayoutC'})
})


// @@withdraw
//get
router.get('/withdraw', async (req,res)=>{

    res.render('withdraw', {layout: 'LayoutC'})
})

// @@tables
// get

router.get('/transactions', async (req,res)=>{

    res.render('table', {layout: 'LayoutC'})
})










module.exports = router;