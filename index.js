const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

//year module
const yearRoutes = require('./src/routes/year.route');


//year module
app.use('/api/v1/year',yearRoutes)

app.get('/',(req,res)=>{
    res.status(200).send("api running \u{1F973}")
})

app.listen(port,()=>{
    console.log(`server started running \u{1F3C3} \u{1F3C3} ${port}`)
})