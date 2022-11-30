const express = require('express');



const router = express.Router()


// dashboard
router.get('/', async (req,res)=>{


    res.render('dashboard', {layout: 'LayoutB'});
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

router.get('/table', async (req,res)=>{

    res.render('table', {layout: 'LayoutC'})
})










module.exports = router;