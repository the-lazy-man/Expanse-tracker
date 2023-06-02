const express = require('express');
const path = require('path');
const port = 8000 ;

const app =  express();

// setting up DB
const db = require('./config/mongoose');
// makeing schema of DB
const expensedb = require('./models/schemaExpense') ; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('styleing'));

/*
let ds = [{ name : "rent ", price : 7000 },
        {name : "gym food ", price : 3000 }];
*/
app.get('/', function(req, res){


    expensedb.find({},function(err , ds){
        if(err)
        {
            console.log("error while feaching data from db");
            return ;
        }
        return res.render('home',{
            title : "My Expense Management" ,
            list : ds ,
            count : 0
        });
        });
});


app.post('/submit',function(req , res){
    expensedb.create({
        name : req.body.name , 
        price : req.body.price
    }, function(err, newlist){
        if(err)
        {
            console.log("error while saving to DB");
            return ;
        }
        //console.log(newlist);
        return res.redirect('/');

    });
});

app.get('/delete-contact',function(req , res){
    

    let var1 = req.query.id
    expensedb.findByIdAndDelete(var1 , function(err){
        if(err)
        {
            console.log("error while deleting from DB");
            return ;
        }
        return res.redirect('/');
    });
});


app.listen(port , function(err){
    if(err)
    {
        console.log(`Error ${err}`);
    }
    console.log("server is up and running");
});