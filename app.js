//const cors = require('cors');
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const api = require('./src/routes/api');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));//static folder
app.use('/api', api);
app.use(cookieParse());
app.use(session({
    secret: 'Keybaord cat',
    resave: false,
    saveUninitialized: false,
    //cookie: {secure: true}
}));
//body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( { extended: false } ));




const port =  process.env.PORT || 8080;//port

app.listen(port, () =>{
    console.log(`Server started at ${port}`);
});