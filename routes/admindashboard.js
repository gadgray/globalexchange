const express = require('express');



const router = express.Router()


// dashboard
router.get('/', async (req,res)=>{

    res.send('admindash')
    // res.render('admindashboard', {layout: 'LayoutB'});
})


// @@tables
// get

router.get('/table', async (req,res)=>{

    res.render('table', {layout: 'LayoutC'})
})










module.exports = router;