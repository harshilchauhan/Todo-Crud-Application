const mongoose=require('mongoose');
require('dotenv').config();
const mongo_Url= process.env.mongoUrl


mongoose.connect(mongo_Url)

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('mongodb conneted..');
})

db.on('error',(err)=>{
    console.log(err);
})

db.on('disconnected',()=>{
    console.log('mongo disconnected');
})

module.exports=db;