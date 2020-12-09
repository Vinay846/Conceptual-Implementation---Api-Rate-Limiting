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

app.get("/api/posts", (req, res)=>{
    let max = 10;
    if(req.query.max > 20){
        max = 10;
    }
    else if (req.query.max > 15){
        max = 15;
    }
    else if(req.query.max !== undefined){
        max = req.query.max;
    }
    let toSend = [];
    for(let i=0; i<max; i++){
        toSend.push(posts[i]);
    }
    res.send(toSend);
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
