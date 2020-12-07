const pupeteer = require('puppeteer');

async function Scrape(url){
    const browser = await pupeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const [el] = await page.$x('/html/body/div[6]/main/div[3]/div[1]/div/div[2]/div[1]/button/img');
    const src = await el.getProperty('src');
    const scrTxT = await src.jsonValue();

    console.log(scrTxT);
    browser.close();
    return scrTxT;
}

module.exports = pupeteer;
//Scrape('https://www.systembolaget.se/1139212');