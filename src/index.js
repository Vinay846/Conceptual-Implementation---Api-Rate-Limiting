const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

const posts = require('./initialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 30*1000,
    max: 5,
    message: "Exceed Number of API Calls"
})

app.use(limiter);

app.use(bodyParser.json())
// your code goes here

const isNullOrUndefined = val => val === null || val === undefined;

let min = Number.MAX_VALUE;
let count = 0;
setTimeout(()=>{
    count = count - 1;
    min = Number.MAX_VALUE;
}, 30*1000);


app.get("/api/posts", (req, res)=>{
    if(count === 5){
        res.status(429).send("Exceed Number of API Calls");
    }else{
        const max = req.query.max;
        let toSend = [];
        count = count + 1;
        if(isNullOrUndefined(max)){
            for(let i=0; i<10; i++){
                toSend.push(posts[i]);
            }
            res.send(toSend);
        }
        else{
            if(max > 20 && min === Number.MAX_VALUE){
                min = 10;
            }else{
                min = Math.min(max, min);
            }
            for(let i=0; i<min; i++){
                toSend.push(posts[i]);
            }
            res.send(toSend);
        }
    }
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
