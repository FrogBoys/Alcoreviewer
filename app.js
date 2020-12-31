const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const api = require('./src/routes/api');
const login = require('./src/routes/login');
const session = require('express-session');
//const validator = require('express-validator');
const cookieParse = require('cookie-parser');
//body parser
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( { extended: true } ));
const port =  process.env.PORT || 8080;//port

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));//static folder

//api call
app.use('/api', api);

app.use('/login', login);

/*
app.use(function(req, res, next){
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});*/
//needs to be revisited its causing req.body errors
app.use(cookieParse());
app.use(session({
    secret: 'Keybaord cat',
    resave: false,
    saveUninitialized: false,
}));

app.listen(port, () =>{
    console.log(`Server started at ${port}`);
});