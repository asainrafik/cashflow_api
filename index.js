const express = require("express");
const bodyParser = require("body-parser");

const yearRoutes = require('./src/routes/year.route');
const gradeSectionRoutes = require('./src/routes/grade.route')
const feeMasterRoutes = require('./src/routes/feemaster.route')
const LoginRoutes = require('./src/routes/login.route')

var cors = require("cors");
const app = express();
const port = process.env.PORT || 5000

const {checkToken} = require('./src/auth/token.validation')

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());


app.options("*", cors());
app.use(
    cors({
        origin: "*",
    })
);


//year module
app.use('/api/v1/year',checkToken,yearRoutes)

app.use('/api/v1/login',LoginRoutes)

//Grade Route Module
app.use('/api/v1/gradeSection',gradeSectionRoutes)

//FeeMaster Route Call
app.use('/api/v1/feeMaster',feeMasterRoutes)

app.get('/',(req,res)=>{
    res.status(200).send("api running \u{1F973}")
})

app.listen(port,()=>{
    console.log(`server started running \u{1F3C3} \u{1F3C3} ${port}`)
})