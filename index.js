const express = require("express");
const bodyParser = require("body-parser");

const yearRoutes = require('./src/routes/year.route');
const gradeSectionRoutes = require('./src/routes/grade.route')
const feeMasterRoutes = require('./src/routes/feemaster.route')
const LoginRoutes = require('./src/routes/login.route')
const DiscountRoute = require('./src/routes/discountfee.route')
const NewAdmission = require('./src/routes/newadmission.route')
const YearOfFeeRoutes = require('./src/routes/yearoffee.route')
const autoSearch = require('./src/routes/studentSearch.route')
const StudentProfile = require('./src/routes/studentprofile.route')
const lastfourpaymentrecord = require('./src/routes/lastfourpaymentrecord.route')
const studentPayment = require('./src/routes/studentBalance.route')
const gradeMaster = require('./src/routes/grademaster.route')
const studentDiscount = require('./src/routes/student_discount.route')
const studentAllPayBalance = require('./src/routes/studentPayAllBal.route')
const studentyears = require('./src/routes/studentyear.route')
const promotionRoutes = require('./src/routes/promotion.route')
const hostalname = require('./src/routes/hostalname.router')
const RoomNo = require('./src/routes/roomno.route')
const uniformsize = require('./src/routes/uniformsize.route')
const uniformitems = require('./src/routes/items.route')
const uniformprice = require('./src/routes/uniformprice.route')
const Places = require('./src/routes/places.route')
const Transport = require('./src/routes/transport.route')
const Stopping = require('./src/routes/stopping.route')
const School = require('./src/routes/school.route')
const Optional = require('./src/routes/feeoptional.route')
const Payment = require('./src/routes/paymentfee.route')


var cors = require("cors");
const app = express();
const port = process.env.PORT || 4000

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
app.use('/api/v1/year',checkToken,yearRoutes);

//Login Route Moudle
app.use('/api/v1/login',LoginRoutes);
app.use('/api/v1/autoSearch',autoSearch)

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
//last four record
app.use('/api/v1/fourRecord',checkToken,lastfourpaymentrecord)

app.use('/api/v1/updateStudentBalance',checkToken,studentPayment)

app.use('/api/v1/grademaster',checkToken,gradeMaster)

app.use('/api/v1/studentdiscount',checkToken,studentDiscount)

app.use('/api/v1/studentAllPayBalance',checkToken,studentAllPayBalance)

app.use('/api/v1/studentyear',checkToken,studentyears)

//Promotion
app.use('/api/v1/promotion',promotionRoutes)

app.use('/api/v1/hostal_name',checkToken,hostalname)

app.use('/api/v1/room_no',checkToken,RoomNo)

app.use('/api/v1/uniform_size',checkToken,uniformsize)

app.use('/api/v1/uniform_items',checkToken,uniformitems)

app.use('/api/v1/uniform_price',checkToken,uniformprice)

app.use('/api/v1/places',checkToken,Places)

app.use('/api/v1/optional',checkToken,Optional)

app.use('/api/v1/transport',checkToken,Transport)

app.use('/api/v1/stopping',checkToken,Stopping)

app.use('/api/v1/school',checkToken,School)

app.use('/api/v1/payment',checkToken,Payment)


app.get('/',(req,res)=>{
    res.status(200).send("api running \u{1F973}")
})

app.listen(port,()=>{
    console.log(`server started running \u{1F3C3} \u{1F3C3} ${port}`)
})