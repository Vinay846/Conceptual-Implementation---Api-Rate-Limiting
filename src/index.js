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

let numberOfApiCall = 0;
let initialReq = null;

app.get("/api/posts", (req, res)=>{
    numberOfApiCall++;
    const parsedMax = Number(req.query.max || 10);
    let max = parseMax > 20 ? 10: parsedMax;

    if(numberOfApiCall > 5){
        res.status(429).send({message: "Exceed Number of API Calls"})
    }
    if(initialReq !== null) {
        max = Math.min(initialReq, max);
    }
    res.send(post.filter((value, idx) => idx < max));

    if(initialReq === null){
        initialReq = max;
        setTimeout(()=>{
            initialReq = null;
            numberOfApiCall = 0;
        }, 30*1000);
    }   
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
