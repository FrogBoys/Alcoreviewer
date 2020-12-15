const express = require('express');
const router = express.Router();
const mongoose = require('mongojs');
const db = mongoose('mongodb+srv://dbAdmin:3dwQ1fU4b0APtt9C@cluster0.buuqu.mongodb.net/Alcoholrevdb?retryWrites=true&w=majority', ['Alcoholrevdb']);
const pupeteer = require('puppeteer');

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
    }catch{
        browser.close();        
        return '../assets/img/no-img.png';
    }

}


//call to pull all beverages from db
router.get('/beverages', (req, res, next) => {    
    db.Alcoholrevdb.find(function(err, beverages){
        if(err){
            res.send(err);
        }                               
        res.send(beverages);                 
               
    });
    
});

//call to get 1 drink
router.get('/beverages/:id', (req, res, next) => {    
    db.Alcoholrevdb.find(function(err, beverages){      
        if(err){
            res.send(err);
        }
        res.send(beverages.find(x => x.id === req.body.id));        
    });
   
});
//call to post beverage to db
router.post('/beverages/add', (req, res, next) => {    
    var data = req.body;
    console.log(data)
    if(data === undefined){
        res.json({"error":"no data"})
    }
    else{
        Scrape(data.id).then(imgurl => {
            data.img = imgurl;   
            if(data.img != null)                  
            db.Alcoholrevdb.save(data, function(err, x){
                if(err){
                   res.send(err);
                }
                res.send(data);
            });
        }).catch(console.log('loading'));    
    }
      
});

//delete call
router.delete('/beverages/:id', (req, res, next) => {
    var bev = req.params.id;
    db.Alcoholrevdb.remove({_id: mongoose.ObjectId(bev)}),(function(err, bevs){
        if(err){
            res.send(err);
        }
        res.send(bevs);
        document.location.reload();
    });
   
});

//function to get image from apkapi
router.get('/apkbeverages/:id', (req, res) => {    
    Scrape(req.params.id).then(imgurl => {                
        console.log(imgurl);
        res.json(imgurl);
        
    }).catch(console.log('loading'));    
});

//call to change beverage
router.put('/beverage/:id',(req,res) =>{    
    db.Alcoholrevdb.change({_id: mongoose.ObjectId(req.params.id)}, (err, beverage)=>{
        if(err){
            res.send(err);
        }
        
    });
})

module.exports = router;