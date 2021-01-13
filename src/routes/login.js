const express = require('express');
const router = express.Router();
const hash = require('pbkdf2-password')();
const Users = require('../app/models/User.js')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;

//method to hash and salt password to make sure it gets harder to enter unauthorized
function auth(uname, pword, fn){
    Users.find(function(err, u){
        user = u.find(x => x.username === uname);// makes sure that there is a user
        if (!user) return fn(new Error('cannot find user'));//error andling incase of no user
        else{
            hash({ password: pword, salt: user.salt }, function (err, pword, salt, hash) {//password is hashed
                if (err) return fn(err);
                if (hash === user.hash) return fn(null, user)//returns the hashed user
                fn(new Error('invalid password'));
            });
        }
    });    
}

//method to sign up to the website
router.post('/signup', function(req, res){
    auth(req.body.username, req.body.password, function(err, user){//username and password is sent to auth function
        if (user === undefined){            
            hash({ password: req.body.password }, function(err, pass, salt, hash) {//password is hashed
                if(err) throw err;
                const newuser = new Users ({//new user object is created
                    _id: new mongoose.Types.ObjectId(),
                    hash: hash,
                    salt: salt,
                    username: req.body.username,
                    usertype: req.body.usertype
                });
                newuser.save();//the user object is saved to db as a user
            });
            
        }else {            
            res.redirect('/login');
        }
    });
});

//method to check if the user is logged in or if the session cookie is still alive if alive then user and true is sent otherwise only false is sent
router.get('/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn:true, user:req.session.user}) : res.status(200).send({loggedIn:false});
});

//method to login user sending either the user without the password or redirecting to /login
router.post('/login', function(req, res){
    auth(req.body.uname, req.body.pword, function(err, user){//call to auth to later compare with the dbs hash and salt
        if (user != undefined) {       
            const userWithoutPassword = user;
            delete userWithoutPassword.password;//removal of password
            req.session.user = userWithoutPassword;
            res.status(200).send(userWithoutPassword);     
        }else {
            
            res.redirect('/login');
        }
    })
})

//method to log out user
router.post('/logout', function(req, res){
    req.session.destroy((err) => {//session is destroyed upon call
        if (err) {
          res.status(500).send('Log out function not working');
        } else {
          res.status(200).send({});
        }
    });
});

module.exports = router;