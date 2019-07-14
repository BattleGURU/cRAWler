const puppeteer = require('puppeteer');
const configs = require('./configs');
const filterLogic = require('./filterLogic');
const cron = require('node-cron');

cron.schedule('*/10 * * * *', () => {
    configs.forEach((configItem)=>{
    try{
    (async() => {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(configItem.url);
        
        const priceTags = await page.evaluate(()=>{
            const divs = document.documentElement.querySelectorAll(".uad-title");
            const data=[];
            divs.forEach((titleItem)=> {
                data.push({
                    "title":titleItem.firstElementChild.firstElementChild.innerText,
                    "link":titleItem.firstElementChild.firstElementChild.href,
                    "price":parseInt(titleItem.nextElementSibling.firstElementChild.innerText.replace(/[\D]+/gm,'').replace(/ /g,'')),
                    "setTime": titleItem.nextElementSibling.lastElementChild.firstElementChild.innerText
                  })
              })
              
            return data;
        })
        filterLogic(priceTags, configItem);
      
        await browser.close();
      })();
    } catch(error) {
      console.log(error)
    }
    });
  });
