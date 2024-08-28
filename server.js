const express = require('express')
const app = express();
const db = require('./config/db');
require('dotenv').config();
const todoRoute = require('./routes/todoRoute')
const PORT = process.env.PORT || 3000;

app.use('/todo',todoRoute)

app.listen(PORT,()=>{
    console.log(`listening port is ${PORT}`);
})