const express = require('express');
const router = express.Router();
const collection = 'users';
const collection1 = 'BusData';
const collection2 = 'prevbookings';
const db = require('../../db');
//User Model
const User = require('../../models/User');
const tkt = require('../../models/tkt');
var ObjectId = require('mongodb').ObjectID;
// @route POST api/users
// @desc Add new users
// @access Public

var result1  = [];

router.post('/signup',(req,res) => {
    

    db.getDb().collection(collection).insertOne({
        email : req.body.email,
        name : req.body.username,
        password : req.body.password,
        dob : req.body.dob,
        balance : req.body.balance
    },(err,result)=>
    {
        if(err) console.log('errrr');
        else
        {
            res.send('succesfully inserted');
        }
    });
});

router.post('/login/:username',(req,res) => {
  
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

router.get('/book_tickets/bus_list/:username/:source/:destination/:doj',(req,res) => {

    
    console.log('now inside router.get and about to do the main finding part');

    db.getDb().collection(collection1).find({
        source : req.params.source,
        destination : req.params.destination
    }).toArray((err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(req.params.username);
            console.log(req.params.source);
            console.log('printing destination');
            console.log(req.params.destination);
            console.log(result);
            res.send(result);
        }
    });




});


router.post('/book_tickets/bus_list/:username/:source/:destination/:doj',(req,res) => {

    
    console.log('now inside router.post and about to insert the booking into the database');

    db.getDb().collection(collection2).insertOne({
        username : req.body.username,
        bus_id : req.body.id,
        source : req.body.source,
        destination : req.body.destination,
        doj : req.body.doj,
        nos : req.body.nos,
        cost : req.body.cost,
        time : req.body.time
    },(err,result)=>
    {
        if(err) console.log('errrr');
        else
        {
            res.send('succesfully inserted the booking data');
        }
    });




});


router.get('/mybook/:username',(req,res) => {

    
    console.log(`now inside router.get and about to return the past bookings of the user with name ${req.params.username}`);

    db.getDb().collection(collection2).find({
        username : req.params.username
    }).toArray((err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(req.params.username);
            console.log(result);
            res.send(result);
        }
    });




});

router.get('/mywallet/:username',(req,res) => {
  
    console.log('inside possst');
    console.log(req.params.username);

    db.getDb().collection(collection).findOne({
        name : req.params.username
    },(err,result)=>
    {
        if(err) console.log(errrr);
        else
        {
            console.log(result);
            res.send(result);
        }
       
    });
    
});

router.put('/mywallet/:username/:balance',(req,res) => {
  
    console.log('inside possst');
    console.log(req.params.username);
    console.log('printing the new balance');
    console.log(req.params.balance);
    db.getDb().collection(collection).findOneAndUpdate({ name : req.params.username},{$set : {balance : req.params.balance}},{returnOrginal: false},(err,result)=>
    {
        if(err) console.log("errrroorrr");
        else{
            console.log('printing the result from users.js put route')
            console.log(result);
          //  res.send(result);
        }
    });
    
});

router.delete('/book_tickets/mybook/:username/:id',(req,res) => {
    //var dojo = doj.toString();
    db.getDb().collection(collection2).deleteMany({
        "_id": ObjectId(req.params.id)
         
    },(err,result)=>
    {
        if(err){  
            res.status(404).json({success : false});
        }
        else{
            console.log(req.params.id);
           // console.log(dojo);
            console.log(result);
            res.send('booking is successfully deleted');
        }
    });

    
});

router.get('/mybook/:id/:doj',(req,res) => {
    //var dojo = doj.toString();
    db.getDb().collection(collection2).count({
         bus_id : req.params.id,
         doj : req.params.doj
    },(err,result)=>
    {
        if(err){  
            res.status(404).json({success : false});
        }
        else{
            console.log(req.params.id);
           // console.log(dojo);
           console.log('printing count');
            console.log(result);
            res.send(result);
        }
    });

    
});


router.put('/book_tickets/bus_list/:username/:source/:destination/:doj/:money',(req,res) => {
  
    console.log('inside possst');
    console.log(req.params.username);
    console.log('printing the money to be deducted');
    console.log(req.params.money);
    db.getDb().collection(collection).findOneAndUpdate({ name : req.params.username},{$set : {balance : req.params.balance}},{returnOrginal: false},(err,result)=>
    {
        if(err) console.log("errrroorrr");
        else{
            console.log('printing the result from users.js put route')
            console.log(result);
          //  res.send(result);
        }
    });
    
});

module.exports = router;

//the whole process is like this , from the component the actions are called ...from where actions call axios path which means as soon as that link
// is called this routes are activated...once that particular route is activated the code inside it is executed and response is sent from where 
// its been called....and now control and sometimes the data from the response goes to the reducer ...then if the response is fine the reducer
// changes the state else it remains as is.