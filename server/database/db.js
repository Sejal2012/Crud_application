import mongoose from "mongoose"
import * as dotenv from 'dotenv' 
dotenv.config()


const connection = async ()=>{
    
    const URL = process.env.MONGO_URL;
    try{
        await mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true});
        console.log("db connected successfully")
    }catch(error){
        console.log("error while connecting db ", error);
    }
}

export default connection;