const express = require('express')
const app = express()
const port = 1998;
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const route = require('./Router/router');
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next()
})
app.use('/',route)
mongoose.connect('mongodb://127.0.0.1:27017/zomato',{useNewUrlParser:true,useUnifiedTopology:true}).then(success=>{
    console.log("mongoDB connected")
    app.listen(port,()=>{
        console.log(`server running at ${port}`);
    })
}).catch(error=>{
    console.log(error)
})
