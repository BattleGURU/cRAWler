const EmailSender = require('./emailModule');


function filterLogic(data, config){

    const emailData=[]
    data.forEach(dataObject => {
        const{
            title, price, link, setTime
        }=dataObject;

        const runningDate=new Date();
        const runningMinutes=runningDate.getMinutes();
        const isPriceGood = price < config.maxPrice;
        let isTextContains=false;
        let isNew=false;

        if (setTime!=='Előresorolt hirdetés') {
            const settedDate=parseInt(setTime.substring(setTime.length-2, setTime.length));
            if(runningMinutes - 5 < settedDate){
                isNew=true
            }
        }

        config.searchStrings.forEach((string)=>{
            if(title.includes(string)){
                isTextContains=true;
            };
        });

        if (isPriceGood && isTextContains && isNew) {
            emailData.push(dataObject);
        }
    });

    if (emailData.length){
        EmailSender(emailData);
    }
}


module.exports=filterLogic