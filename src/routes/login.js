const express = require('express');
const router = express.Router();
const mongoose = require('mongojs');
const hash = require('pbkdf2-password')();
const db = mongoose('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority', ['Users']);


/*
hash({ password: 'jeff' }, function(err, pass, salt, hash) {
    if(err) throw err;
    u.test.salt = salt;
    u.test.hash = hash;
});*/

function auth(uname, pword, fn){
    db.Users.find(function(err, u){
        user = u.find(x => x.name === uname);
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

router.get('/login', function(req, res){
    res.send('login');  
    
})

router.post('/login', function(req, res){
    console.log(req.body);
    auth(req.body.uname, req.body.pword, function(err, user){
        if (user != undefined) {            
            console.log('yey')
            res.redirect('back');
            
        }else {
            
            res.redirect('/login');
        }
    })
})

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    })
})
/*
router.get('/restricted',restrict, function(req,res){
    res.send('jeff');
})*/

module.exports = router;