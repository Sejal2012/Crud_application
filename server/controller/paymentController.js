// import {instance} from '../index.js';
import * as dotenv from 'dotenv' 
dotenv.config()


import Razorpay from 'razorpay';
import crypto from 'crypto';
export const order = async(req,res)=>{
    let instance = new Razorpay({key_id:process.env.RAZOR_API_KEY,key_secret:process.env.RAZOR_API_SECRET});
   
    const options ={
        amount : req.body.amount*100,
        currency :"INR",
    };  console.log(req.body.amount);

    instance.orders.create(options,function(err,order){
        if(err){
            return res.send({code:500, message:'server Err'})
        }
        return res.send({code: 200 , message :'order created',data: order});
      });
}
export const varify= (req,res)=>{
        let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
         var expectedSignature = crypto.createHmac('sha256', 'DAR1Y7SBY6Vamr1iQXzQdxEc')
                                         .update(body.toString())
                                         .digest('hex');
         var response = {"signatureIsValid":"false"}
         if(expectedSignature === req.body.response.razorpay_signature){
          response={"signatureIsValid":"true"}
          res.send({code:200 , message: 'sign valid'})
       }else{
             res.send({code:500 , message: 'sign Invalid'})
       }
       
}