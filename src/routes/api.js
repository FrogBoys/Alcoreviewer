const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;
const pupeteer = require('puppeteer');
const Beverage = require('../app/models/Beverage.js');//Beverage model which is used to connect to db
const Users = require('../app/models/User.js');//User model which is used to connect to db

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connected to DB");
}); 

const AuthUser = (req, res, next) => {// authenticate user method to make sure the user is logged in
    if(req.session && req.session.user) {
      next();
    } else {
      res.status(403).send({
        errorMessage: 'You must be logged in.'
      });
    }
};

//fucntion to scrape systembolaget after a specific image
async function Scrape(id){       
    const browser =  await pupeteer.launch();//starts a chromium browser      
    try{
        const page = await browser.newPage();//opens a pgae
        await page.goto('https://www.systembolaget.se/' + id);// goes to systembolaget with the specified beverage id
        const [el] = await page.$x('/html/body/div[5]/main/div[3]/div[1]/div/div[2]/div[1]/button/img');//gets the specific elemetn on the page 
        const src = await el.getProperty('src');// gets the img src
        const scrTxT = await src.jsonValue();//gets the jsonvalue 
        browser.close();//closes the browser
        return scrTxT;//returns img src
    }catch{//incase the url or img iws depricated there is a catch where no-img img is shown instead
        browser.close();        
        return '../assets/img/no-img.png';//standard no-img in assets img folder
    }

}
//get my-beverage with specific id
router.get('/my-beverages/:id', (req, res, next) =>{
    Beverage.find({ userid: req.params.id }, (err, response) => {
        if(err){
            res.send(err);
        }        
        res.send(response);   
    });
});

//call to pull all beverages from db
router.get('/beverages', (req, res, next) => {    
    Beverage.find(function(err, beverages){
        if(err){
            res.send(err);
        }                               
        res.send(beverages);                 
               
    });
    
});

//call to get 1 drink
router.get('/beverages/:id', (req, res, next) => {    
    Beverage.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, response){      
        if(err){
            res.send(err);
        }        
        res.send(response);        
    });
   
});

//call to post beverage to db
router.post('/beverages/add', AuthUser, (req, res, next) => {    
    var data = req.body;
    const newbeverage = new Beverage({ // creates a new beverage object from req.body
        _id: new mongoose.Types.ObjectId(),
        id: data.id,
        name: data.name,
        procentage: data.procentage,
        type: {
            typename: data.type.typename,
            subtype: data.type.subtype,
        },
        taste: data.taste,
        score: data.score,
        price: data.price,
        apk: data.apk,
        link: data.link,
        username: data.username,
        userid: data.userid,
        img: data.img,
        timesdrunk: data.timesdrunk,
    });
    if(data === undefined){
        res.json({"error":"no data"})
    }
    else if(newbeverage.img == null || newbeverage.img == undefined){
        Scrape(data.id).then(imgurl => {
            newbeverage.img = imgurl;//this stores the scpared image as thge img object
            newbeverage.save();//saves to db
        }).catch(console.log('loading'));    
    }
    else{// if the img is already set the scrape method is skipped to optimize performance
        newbeverage.save();
    }
      
});

//delete call 
router.delete('/beverages/:id',AuthUser, (req, res) => {
    try{       
        Beverage.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, response){// deletes one beverage from the db with the specific mongoose _id
            if(err){
                res.send(err);
            }
            res.send(response);
        });
    }catch (err){ 
        console.log(err);
    }
   
}); 

//function to get image from apk api
router.get('/apkbeverages/:id', (req, res) => {    
    Scrape(req.params.id).then(imgurl => {                
        console.log(imgurl);
        res.json(imgurl);
        
    }).catch(console.log('loading'));    
});

//call to change beverage
router.put('/beverage/:id', AuthUser,(req,res) =>{// AuthUser to make sure it is the correct user
    Beverage.updateOne({_id: req.params.id}, { score: req.body.score } ,{upsert: true}, (err)=>{
        if(err){
            console.log(err);
        }
    });
})

//call to get all users so admins can delete if wanted
router.get('/getusers', (req, res, next) =>{
    Users.find((err, response) => {
        if(err){
            res.send(err);
        }        
        res.send(response);   
    });
});

//call to delete user with specific _id from db
router.delete('/deluser/:id',AuthUser, (req, res) => {
    try{       
        Users.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, response){
            if(err){
                res.send(err);
            }
            res.send(response);
        });
    }catch (err){
        console.log(err);
    }
   
});

module.exports = router;