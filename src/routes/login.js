const express = require('express');
const router = express.Router();
const mongoose = require('mongojs');
const hash = require('pbkdf2-password');
const db = mongoose('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority', ['Alcoholrevdb']);
const session = require('express-session');

var u = {
    test: { name: 'test' }
}

hash({ password: 'foo' }, function(err, pass, salt, hash) {
    if(err) throw err;
    u.test.salt = salt;
    u.test.hash = hash;
});

function auth(uname, pword, fn){
    var user = u[name];


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

router.post('./login', function(req, res){
    console.log(req.body);
    auth(req.body.username, req.body.password, function(err, user){
        if (user) {            
            req.session.regenerate(function(){             
              req.session.user = user;
              req.session.success = 'Authenticated as ' + user.name
                + ' click to <a href="/logout">logout</a>. '
                + ' You may now access <a href="/restricted">/restricted</a>.';
              res.redirect('back');
            });
        }else {
            req.session.error = 'Authentication failed, please check your '
              + ' username and password.'
              + ' (use "tj" and "foobar")';
            res.redirect('/login');
        }
    })
})

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    })
})

router.get('/restricted',restrict, function(req,res){
    res.send('jeff');
})

module.exports = router;