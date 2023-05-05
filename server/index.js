import express, { response } from 'express';
import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from "razorpay";

import Routes from './Routes/route.js';
import Connection from './database/db.js';
import {config} from "dotenv";
config({path : "./config/config.env"});

const app = express();



// To handle HTTP POST requests in Express.js version 4 and above, 
// you need to install the middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', Routes);

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

const PORT = '8000';
// app.get("/getkey",(request,response)=>
//  response.status(200).json({key:process.env.RAZOR_API_KEY})
// );

Connection();
 
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));