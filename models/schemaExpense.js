const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name:{type : String , required : true } ,
    price:{type : Number , required : true }    
});

const expensedb = mongoose.model('expensedb' , ListSchema );

module.exports=expensedb;