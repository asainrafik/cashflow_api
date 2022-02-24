const express = require("express");
const bodyParser = require("body-parser");

const yearRoutes = require('./src/routes/year.route');
const gradeSectionRoutes = require('./src/routes/grade.route')
const feeMasterRoutes = require('./src/routes/feemaster.route')
const LoginRoutes = require('./src/routes/login.route')
const DiscountRoute = require('./src/routes/discountfee.route')
const NewAdmission = require('./src/routes/newadmission.route')
const YearOfFeeRoutes = require('./src/routes/yearoffee.route')
const StudentProfile = require('./src/routes/studentprofile.route')


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
app.use('/api/v1/gradeSection',checkToken,gradeSectionRoutes)

//FeeMaster Route Call
app.use('/api/v1/feeMaster',checkToken,feeMasterRoutes)
//Year of Fee 
app.use('/api/v1/yearOffee',checkToken,YearOfFeeRoutes);
 //Discount Route module
app.use('/api/v1/discountfee',checkToken,DiscountRoute)
//NewAdmission Route module
app.use('/api/v1/newAdmission',checkToken,NewAdmission)
//Student Profile 
app.use('/api/v1/studentProfile',checkToken,StudentProfile)


app.get('/',(req,res)=>{
    res.status(200).send("api running \u{1F973}")
})

app.listen(port,()=>{
    console.log(`server started running \u{1F3C3} \u{1F3C3} ${port}`)
})