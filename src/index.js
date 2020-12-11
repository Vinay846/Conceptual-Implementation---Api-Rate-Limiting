const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

const posts = require('./initialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

const isNullOrUndefined = val => val === null || val === undefined;

let reqCount = 0;
const handleReq = [];

app.get("/api/posts", (req, res)=>{
    if(reqCount > 5){
        res.status(429).send({message: "Exceed Number of API Calls"});
    }else{
        const max = req.query.max;
        let toSend = [];
        reqCount++;
        handleReq.push(max);
        if(isNullOrUndefined(max) || max > 20){
            for(let i=0; i<10; i++){
                toSend.push(posts[i]);
            }
            res.send(toSend);
        }
        else{
            setTimeout(()=>{
                reqCount--;
                handleReq.shift();
            }, 30*1000);
            
            min = Math.min(max, handleReq[0]);
            for(let i=0; i<min; i++){
                toSend.push(posts[i]);
            }
            res.send(toSend);
        }
    }
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
