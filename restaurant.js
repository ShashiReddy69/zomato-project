const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const restaur = {
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    city_name:{
        type:String,
        required:true
    },
    city:{
        type:Number,
        required:true
    },
    area:{
        type:Number,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    thumb:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:Array,
        required:true
    },
    cuisine:{
        type:Array,
        required:true
    },
    cuisine_id:{
        type:Number,
        required:true
    }
}
module.exports = mongoose.model("restaurant",restaur,"restaurant")