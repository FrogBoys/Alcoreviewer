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
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));//static folder

app.use(session({
    secret: 'Keybaord cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  100000 },
}));
//routes
app.use('/api', api);
app.use('/login', login);
//redirecting to index
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './src', '/index.html'));
});

app.use(cookieParse());


app.listen(port, () =>{
    console.log(`Server started at ${port}`);
});