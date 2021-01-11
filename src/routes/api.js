const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;
const pupeteer = require('puppeteer');
const Beverage = require('../app/models/Beverage.js')

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connected to DB");
}); 

const AuthUser = (req, res, next) => {
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
    const browser =  await pupeteer.launch();        
    try{
        const page = await browser.newPage();
        await page.goto('https://www.systembolaget.se/' + id);    
        const [el] = await page.$x('/html/body/div[6]/main/div[3]/div[1]/div/div[2]/div[1]/button/img');
        const src = await el.getProperty('src');
        const scrTxT = await src.jsonValue();        
        browser.close();        
        return scrTxT;
    }catch{//incase the url or img iws depricated there is a catch where no-img img is shown instead
        browser.close();        
        return '../assets/img/no-img.png';
    }

}

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
    const newbeverage = new Beverage({
        _id: new mongoose.Types.ObjectId(),
        id: data.id,
        name: data.name,
        procentage: data.procentage,
        type: data.type,
        taste: data.taste,
        score: data.score,
        price: data.price,
        userid: data.userid
    });
    if(data === undefined){
        res.json({"error":"no data"})
    }
    else{
        Scrape(data.id).then(imgurl => {
            newbeverage.img = imgurl;//this stores the scpared image as thge img object
            if(data.img != null){}
            newbeverage.save();
        }).catch(console.log('loading'));    
    }
      
});

//delete call
router.delete('/beverages/:id',AuthUser, (req, res) => {
    var bev = req.params.id;
    try{       
        Beverage.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, response){
            if(err){
                res.send(err);
            }
            res.send(response);
        });
    }catch (err){ 
        console.log(err);
    }
   
});

//function to get image from apkapi
router.get('/apkbeverages/:id', (req, res) => {    
    Scrape(req.params.id).then(imgurl => {                
        console.log(imgurl);
        res.json(imgurl);
        
    }).catch(console.log('loading'));    
});

//call to change beverage
router.put('/beverage/:id', AuthUser,(req,res) =>{    
    Beverage.updateOne({_id: req.params.id}, { score: req.body.score } ,{upsert: true}, (err)=>{
        if(err){
            console.log(err);
        }
    });
})


module.exports = router;