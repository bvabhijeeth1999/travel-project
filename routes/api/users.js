const express = require('express');
const router = express.Router();
const collection = 'users';
const collection1 = 'BusData';
const db = require('../../db');
//User Model
const User = require('../../models/User');
const tkt = require('../../models/tkt');
// @route POST api/users
// @desc Add new users
// @access Public

var result1  = [];

router.post('/signup',(req,res) => {
    

    db.getDb().collection(collection).insertOne({
        email : req.body.email,
        name : req.body.username,
        password : req.body.password,
        dob : req.body.dob
    },(err,result)=>
    {
        if(err) console.log('errrr');
        else
        {
            res.send('succesfully inserted');
        }
    });
});

router.post('/login',(req,res) => {
  
    console.log('inside possst');
    console.log(req.body.username);
    console.log(req.body.password);

    db.getDb().collection(collection).findOne({
        name : req.body.username,
        password : req.body.password
    },(err,result)=>
    {
        if(err) console.log(errrr);
        else
        {
            if(result === null){
                return res.status(401).json({ message: "plz check details" });
            }
            else{
                return res.status(200).json({ message: "Successfull login" });
            }
        }
       
    });
    
});

router.post('/book_tickets',(req,res) => {
    console.log(req.body.source);
    console.log(req.body.destination);
    db.getDb().collection(collection1).find({
        source : req.body.source,
        destination : req.body.destination
    },(err,result)=>
    {
        if(err) console.log(errrr);
        else
        {
            result1 = result;
        }
    });
});

router.get('/book_tickets/bus_list',(req,res) => {

;

});


module.exports = router;

//the whole process is like this , from the component the actions are called ...from where actions call axios path which means as soon as that link
// is called this routes are activated...once that particular route is activated the code inside it is executed and response is sent from where 
// its been called....and now control and sometimes the data from the response goes to the reducer ...then if the response is fine the reducer
// changes the state else it remains as is.