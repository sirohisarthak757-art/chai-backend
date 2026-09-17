import dns from "dns";
import {app} from "./app.js";
dns.setServers(['8.8.8.8', '1.1.1.1']);

//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";


dotenv.config({
  path: './env'
})



connectDB()
.then(()=>{
  app.listen(process.env.PORT|| 8000 ,() =>{
    console.log(`Server is running at port :${process.env.PORT || 8000
    }`)
  })
})
.catch((err)=>{
console.log("MONGO dc connection failed !!!", err);
})



















/*
import express from "express";
const app = express();
( async () => {
try{
  await mongoose.connect(`${process.env.MONGO_URI}`);
  app.on("error", ()=>{
    console.log("ERRR: ", error);
    throw error;
  })
  app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
  });
}catch(err){
    console.log("Error:", error);
    throw err;
}
})()
*/