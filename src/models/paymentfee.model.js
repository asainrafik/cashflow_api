var dbConn = require("../../config/db.config");

var Payment = function (payment) {   
    this.student_id = payment.student_id;
    this.year_id = payment.year_id;
    this.term_name =payment.term_name;
};

Payment.getPaymentModel = (paymentReq, result) => {
    // console.log(paymentReq,"Payment")
    dbConn.query(`SELECT * from student_payment_infos LEFT join fee_masters on student_payment_infos.fee_master_id=fee_masters.fee_master_id where student_id = "${paymentReq.student_id}" and year_id ="${paymentReq.year_id}" and term_name ="${paymentReq.term_name}"`,(err, res) =>{
        if(res){
            let temArr = [];
            let pusharr = [];
            let balance = 0;
            let totalRefund = 0;
            let totalpaid = 0;
            let totalFees = 0;
            let totalcumamt = 0;
            let totaldiscountamount =0;
            temArr.push(pusharr);
           res.map((ele)=>{
            pusharr.push(ele)
               if(ele){
                balance = Number(ele.balance) + balance;
                totalRefund = Number(ele.refund) + totalRefund;
                totalpaid = Number(ele.amount_paid) + totalpaid;
                totalFees = Number(ele.actual_fees);
                totalcumamt = Number(ele.cum_amt) + totalcumamt;
                totaldiscountamount = Number(ele.discount_amount) + totaldiscountamount;
                console.log(temArr,"balance") 
               }
            })
            temArr.push({ balance: balance },{totalRefund:totalRefund},{totalpaid:totalpaid},{totalFees:totalFees},{totalcumamt:totalcumamt},{totaldiscountamount:totaldiscountamount});
            result(null,temArr)
            //  dbConn.query(`SELECT * from student_payment_infos where student_id ="${paymentReq.student_id}" and optional_fees=true;`,(err, res) =>{
          //   if(res){
          //       let balance = 0;
          //       let totalRefund = 0;
          //       let totalpaid = 0;
          //       let totalFees = 0;
          //       let totalcumamt = 0;
          //       let totaldiscountamount =0;
          //         let tempObj ={}
          //         tempObj.optional_status = true
          //         tempObj.optional_fees = res
          //       // res.map((e)=>{
          //       //     let optional_fees = e.optional_fees;
          //       //     temArr.push(optional_fees)
          //       // })
          //         temArr.push(tempObj)
          //         res.map((element) =>{
          //             if(element){
          //               balance = Number(element.balance) + balance;
          //               totalRefund = Number(element.refund) + totalRefund;
          //               totalpaid = Number(element.amount_paid) + totalpaid;
          //               totalFees = Number(element.actual_fees);
          //               totalcumamt = Number(element.cum_amt) + totalcumamt;
          //               totaldiscountamount = Number(element.discount_amount) + totaldiscountamount;
          //             }
          //             console.log(element,"paymentobject")
          //         })
          //         tempObj.optional_balance ={ balance,totalRefund,totalpaid,totalFees,totalcumamt,totaldiscountamount};
          //           //   tempObj.optio({ balance: balance },{totalRefund:totalRefund},{totalpaid:totalpaid},{totalFees:totalFees},{totalcumamt:totalcumamt},{totaldiscountamount:totaldiscountamount})
          //         result(null,temArr)
          //     }
          //  })
        }else{
            result(null, err);
            console.log(err)
          }
    })
   
};

module.exports = Payment;