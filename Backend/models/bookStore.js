const mongoose=require('mongoose');
const bookStoreSchema=mongoose.Schema({
title:{
    type:String,
    required:true
},
author:{
    type:String,
    required:true
},
publishYear:{
    type:Number,
    required:true
},
})
const Book=mongoose.model('Book',bookStoreSchema)
module.exports={Book}