const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport')

const router = express.Router()

// models
const User = require('../models/User');

// nodemail middleware
const sendMail = require('../middleware/nodemailer');

// @pages rouets
// home
router.get('/', async (req,res)=>{


    res.sendFile(path.join(__dirname, '../pages/index.html'))
})
// about
router.get('/about', async (req,res)=>{


    res.sendFile(path.join(__dirname, '../pages/about.html'))
})

router.get('/ourplan', async (req,res)=>{


    res.sendFile(path.join(__dirname, '../pages/ourplan.html'))
})
router.get('/plan', async (req,res)=>{


    res.sendFile(path.join(__dirname, '../pages/plan.html'))
})

// @@login routes
// get
router.get('/login', async (req,res)=>{

    res.render('login');
})
router.post('/login', passport.authenticate('user_local', {failureRedirect: '/login'}), 
(req,res)=>{

    res.redirect('/dashboard')
}
)


// @@registr routes
// get register
router.get('/register', async (req,res)=>{
 
    res.render('register');
})
router.post('/register', async (req,res)=>{
    const {firstname, lastname, email, phone, countryCode, password, password2  } = req.body 
    console.log(req.body)
    if (!firstname || !lastname || !email || !phone || !countryCode || !password || !password2 ){

        console.log ('fill in all fields')
        req.flash('error_msg', 'fill in all fields');
        res.render('register', {user: req.body})
    }else{
        if(password != password2){
            console.log ('password')
            req.flash('error_msg', 'passwords do not match');
            res.render('register', {user: req.body})
        }else{
            User.findOne({email: email}, (err, user)=>{
                if(err){
                    console.log(err)
                    res.render('register', {user: req.body})
        
                }
        
                if(user){
                    console.log ('fuser')
                    req.flash('error_msg', 'email aready used');
                    res.render('register', {user: req.body})
                }else{
                    
                const phoneNo = (countryCode, phone)=>{
        
                    return(countryCode+phone)
                }
        
                 bcrypt.genSalt( 8, (err, salt)=>{
        
                    bcrypt.hash(password, salt, (err, hash)=>{
                        if(err){
                            console.log(err);
                            res.render('register');
                        }else{
                            const newUser = new User({
                                firstName: firstname,
                                lastName: lastname,
                                email: email,
                                phoneNo: phoneNo(),
                                password: hash,
                            })
    
                            newUser.save(err=>{
                                if(!err){
                                    
                                req.flash('success_msg', 'congratulation your registration was successful!')
                                res.redirect('/login');
                                }else{
                                    req.flash('error_msg', 'error registering try again')
                                res.redirect('/register');
                                }
                            })
                        }
    
                        
                        
                    })
                 } )
                }

                
        
        
        
        
            })
        }
    
        
    }

    

})





module.exports = router;