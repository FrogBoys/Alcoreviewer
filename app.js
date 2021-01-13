const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const api = require('./src/routes/api');
const login = require('./src/routes/login');
const session = require('express-session');
const cookieParse = require('cookie-parser');
//body parser
let Queue = require('bull');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( { extended: true } ));
const port =  process.env.PORT || 8080;//port
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let workQueue = new Queue('work', REDIS_URL);
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});

//View engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('./dist/AlcoRev'));//static folder

app.use(session({//session
    secret: 'Keybaord cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  1000000 },
}));
//routes
app.use('/api', api);
app.use('/login', login);
//redirecting to index
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist/AlcoRev', '/index.html'));
});

app.use(cookieParse());


app.listen(port, () =>{
    console.log(`Server started at ${port}`);
});