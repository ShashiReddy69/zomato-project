const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const meal = {
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
}
module.exports = mongoose.model("meals",meal,"meals")