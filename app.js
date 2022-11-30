const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const layouts = require('express-ejs-layouts'); 
const session = require('express-session');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({path: 'config/config.env'});
const PORT = process.env.PORT  || 5000;

// initalize app
const app = express();


// connect database
const connectDB = require('./config/bd');
connectDB();
// middelwares
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));


// @ejs
app.use(layouts);
app.set('view engine', 'ejs');


// sessions
app.use(session({
    secret: 'exchanges',
    resave: false,
    saveUninitialized: false,
    }
));

// passport
// require('./config/passport').AdminAuth(passport);
// require('./config/passport').UsersAuth(passport);
// passport
require('./config/passport').AdminAuth();
require('./config/passport').UsersAuth();

// passport
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global variables
app.use((req, res, next)=>{
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
})

// routes
app.use('/', require('./routes/index'));
app.use('/dashboard', require('./routes/dasboard'));
app.use('/admindashboard', require('./routes/admindashboard'));

app.listen(PORT, console.log(`app ruuning on port ${PORT}`))