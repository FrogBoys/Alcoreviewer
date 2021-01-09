const express = require('express');
const router = express.Router();
const hash = require('pbkdf2-password')();
const Users = require('../app/models/User.js')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;



function auth(uname, pword, fn){
    Users.find(function(err, u){
        user = u.find(x => x.username === uname);
        if (!user) return fn(new Error('cannot find user'));
        else{
            hash({ password: pword, salt: user.salt }, function (err, pword, salt, hash) {
                if (err) return fn(err);
                if (hash === user.hash) return fn(null, user)
                fn(new Error('invalid password'));
            });
        }
    });    
}

function restrict(req, res, next){
    if(req.session.user){
        next();
    }
    else{
        req.session.error = 'Access denied'
        res.redirect('/login');
    }
}


router.post('/signup', function(req, res){
    auth(req.body.username, req.body.password, function(err, user){
        if (user === undefined){            
            hash({ password: req.body.password }, function(err, pass, salt, hash) {
                if(err) throw err;
                const newuser = new Users ({
                    _id: new mongoose.Types.ObjectId(),
                    hash: hash,
                    salt: salt,
                    username: req.body.username 
                });
                newuser.save();
            });
            
        }else {            
            res.redirect('/login');
        }
    });
});


router.post('/login', function(req, res){
    console.log(req.session);
    auth(req.body.uname, req.body.pword, function(err, user){
        if (user != undefined) {       

            const userWithoutPassword = user;
            delete userWithoutPassword.password;
            req.session.user = userWithoutPassword;
            res.status(200).send(userWithoutPassword);     
        }else {
            
            res.redirect('/login');
        }
    })
})

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    })
});

router.get('/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Could not log out.');
    } else {
        res.status(200).send({});
    }
    });
  });


module.exports = router;