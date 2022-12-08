const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport')

const router = express.Router()

// models
const User = require('../models/User');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
// nodemail middleware
const {registerMail,  passwordChangeMail} = require('../middleware/nodemailer');

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

// contacts
router.get('/contact', (req,res)=>{


    res.render('contact')
})
router.post('/contact', async (req,res)=>{

    const {name, email, subject, phone, message} = req.body;

    const contact = new Contact({
        name: name,
        email:email,
        subject: subject,
        phoneNo: phone,
        message: message
    })

    await contact.save(err=>{
        if(err){
            req.flash('error_msg', 'something went wrong... please try again');
            res.redirect('/contact');
        }else{
            req.flash('success_msg', 'message sent successfully. we will get back to soon! ');
            res.redirect('/contact');
        }
    })
})


// @@login routes
// get
router.get('/login', async (req,res)=>{

    res.render('login');
})
router.post('/login', passport.authenticate('user_local', 
{
    session: true,
    failureRedirect: '/login',
    failureFlash: true
}), 
(req,res)=>{
    
    res.redirect('/dashboard')
}
)

// logout
router.get('/logout', (req,res,next)=>{
    req.logout(err=>{
        if(err){
            console.log(err)
            return next(err)
        }
        req.flash('success_msg', 'logout successful')
        res.redirect('/login')
    })
})


// @@registr routes
// get register
router.get('/register', async (req,res)=>{
 
    res.render('register');
})
router.post('/register', async (req,res)=>{
    const {firstname, lastname, email, phone, countryCode, password, password2  } = req.body 

    if (!firstname || !lastname || !email || !phone || !countryCode || !password || !password2 ){
        req.flash('error_msg', 'fill in all fields');
        res.render('register', {user: req.body})
    }else{
        if(password != password2){
            req.flash('error_msg', 'passwords do not match');
            res.render('register', {user: req.body})
        }else{
            User.findOne({email: email}, (err, user)=>{
                if(err){
                    console.log(err)
                    res.render('register', {user: req.body})
        
                }
        
                if(user){
                    req.flash('error_msg', 'email aready used');
                    res.render('register', {user: req.body})
                }else{
                    
                const phoneNo = ()=>{

                    return(countryCode + phone)
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
                                    registerMail(newUser.email, newUser.firstName);
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



// @@admin routes
// adminregister
// get
router.get('/adminregister', (req,res)=>{

    res.render('adminregister', {layout: 'LayoutC'})
})
// post
router.post('/adminregister', (req,res)=>{
    const {name, username, email, password, password2} = req.body;
    if(password != password2){
        req.flash('error_msg', 'passwords do not match')
        res.render('adminregister', {layout: 'LayoutC', name, username, password, password2})
    }else{
        Admin.findOne({userName: username}, (err, user)=>{
            if(!err){
                if(user){
                    req.flash('error_msg', 'username already exists')
                    res.redirect('/adminregister')
                }else{
                    bcrypt.genSalt(8,(err, salt)=>{

                        bcrypt.hash(password, salt, (err, hash)=>{
                            const admin = new Admin({
                                fullName: name,
                                userName: username,
                                email: email,
                                password: hash
                            })

                            admin.save(err=>{
                                if(err){
                                    console.log(err);
                                    req.flash('error_msg', 'error creating user')
                                    res.redirect('/adminregister')
                                }else{
                                    req.flash('success_msg', 'new admin created!')
                                    res.redirect('/admindashboard');
                                }
                            })

                        })
                    } )
                    
                }
            }else{
                console.log(err);
            }
        })
    }
})

// @@adminogin routes
// get
router.get('/adminlogin', async (req,res)=>{

    res.render('adminlogin');
})
router.post('/adminlogin', passport.authenticate('admin_local', 
{
    failureRedirect: '/adminlogin',
    failureFlash: true}), 
(req,res)=>{

    res.redirect('/admindashboard')
}
)

// update User
router.post('/updateuser', (req, res)=>{
    const update = {
        plan: req.body.plan,
        accountBalance: req.body.accBal,
        miningBalance: req.body.minBal,
        totalBalance: req.body.totalBal,

    }
    console.log(req.body)
    User.findByIdAndUpdate(req.body.id, update, (err)=>{
        if(!err){
            req.flash('success_msg', 'udated');
            res.redirect('/admindashboard');
        }else{
            req.flash('error_msg', 'error udating');
            res.redirect('/admindashboard');
        }
    })
     
})

// delete user
router.get('/deleteuser/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id, (err)=>{
        if(!err){
            req.flash('success_msg', 'Deleted');
            res.redirect('/admindashboard');
        }else{
            req.flash('error_msg', 'Error Deleting');
            res.redirect('/admindashboard');
        }
    })
})


// delete contacts
router.get('/deletecontact/:id', (req, res)=>{

    Contact.findByIdAndDelete(req.params.id, err=>{

        if(!err){
            req.flash('success_msg', 'Deleted');
            res.redirect('/admindashboard/contacts');
        }else{
            req.flash('error_msg', 'Error Deleting');
            res.redirect('/admindashboard/contacts');
        }
        
    })
})

router.get('/passrecovery', (req, res)=>{

    res.render('confirm');

})

router.post('/confirmemail', (req, res)=>{

    const {email} = req.body;
    try {
        User.findOne({email: email}, (err, user)=>{
            if(!user){
    
                req.flash('error_msg', 'Invalid email')
                res.redirect('/passrecovery');
            }else{
                const {email, firstName, _id} = user;
                passwordChangeMail(email, _id, firstName,)
                req.flash('success_msg', 'An email has been sent to you with steps on how to change your password')
                res.redirect('/passrecovery');
            }
        })
        
    } catch (err) {
        console.log(err)
        req.flash('error_msg', 'Try again later')
                res.redirect('/passrecovery');
    }
    
    
})

router.get('/passchange/:id', (req,res)=>{
    
    console.log(req.params.id)
    User.findOne({_id: req.params.id}, (err, user)=>{

        if(!user){
            res.redirect('/')
        }else{
            res.render('password', {id: req.params.id})
        }
    })

})

router.post('/password', (req,res)=>{

    const {id, password, password2} = req.body;
    
    console.log(req.body)
    if(password != password2){
        req.flash('error_msg', 'passwords do not match')
        res.redirect(`/passchange/${id}`)
    }else{

        bcrypt.genSalt(8, (err, salt)=>{
            if(!err){
                console.log(salt)
                bcrypt.hash(password, salt, (err, hash)=>{
                    console.log(hash)
                    User.updateOne({_id: id}, {
                        $set: {password: hash}

                        }, (err)=>{

                            if(!err){
                                req.flash('success_msg', 'login')
                                res.redirect('/login');
                            }
                        }
                    )

                })
            }
        })
            
        
    }
})



module.exports = router;