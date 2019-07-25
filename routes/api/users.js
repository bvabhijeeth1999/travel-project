const express = require('express');
const router = express.Router();
const collection = 'users';
const collection1 = 'BusData';
const collection2 = 'prevbookings';
const mysql=require('mysql');
//User Model
const User = require('../../models/User');
const tkt = require('../../models/tkt');
// @route POST api/users
// @desc Add new users
// @access Public


const connection=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test'
});

const connect=connection.connect((err)=>
{
    if(err)
    {
        console.log('unable to connect');
        process.exit(1);
    }
    else{
        console.log('connection succefull');
    }
});
router.post('/signup',(req,res) => {
    

    connection.query("insert into users value('"+req.body.username+"','"+req.body.password+"','"+req.body.email+"','"+req.body.dob+"',0)",(err,result)=>{
        if(err)console.log(err);
        else{
            console.log("signup successfull");
        }
    })
});

router.post('/login/:username',(req,res) => {
  
    console.log('inside possst');
    console.log(req.body.username);
    console.log(req.body.password);

        connection.query("SELECT name,password FROM users where name='"+req.body.username+"' and password='"+req.body.password+"'",(err,result)=>{
        if(err) console.log(err);
        else{
            if(result[0]==null)
            {
                return res.status(401).json({message : "please check details"});
            }
            else{
                console.log(result);
                return res.status(200).json({message : "login successfull"});
            }
        }
    });
});

router.post('/book_tickets',(req,res) => {
    console.log(req.body.source);
    console.log(req.body.destination);
    connection.query("select * from BusData where source='"+req.body.source+"' and destination='"+req.body.destination+"'",(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            console.log(result);
        }
    });
});

router.get('/book_tickets/bus_list/:username/:source/:destination/:doj',(req,res) => {

    
    console.log('now inside router.get and about to do the main finding part');

    connection.query("select * from BusData where source='"+req.params.source+"' and destination='"+req.params.destination+"'",(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            {
                console.log(result);
                res.send(result);
            }
        }
    });




});


router.post('/book_tickets/bus_list/:username/:source/:destination/:doj',(req,res) => {

    
    console.log('now inside router.post and about to insert the booking into the database');
    var id;
    connection.query("select max(booking_id) from bookings",(err,result)=>{
        if(err) console.log(err);
        else{
            console.log(result);
            
          //  console.log("id is "+id);
        }
    })
    connection.query("insert into bookings(doj,nos,bus_id,username) values('"+req.body.doj+"',"+req.body.nos+","+req.body.id+",'"+req.body.username+"')",(err,result)=>{
        if(err)console.log(err);
        else{
            res.send('succesfull inserted');
        }
    })

});


router.get('/mybook/:username',(req,res) => {

    
    console.log(`now inside router.get and about to return the past bookings of the user with name ${req.params.username}`);

    connection.query("select booking_id,username,bookings.bus_id,source,destination,doj,nos,price,time from bookings,busdata where bookings.bus_id=busdata.bus_id and username='"+req.params.username+"'",(err,result)=>{
        if(err) console.log(err);
        else{
            if(result[0]!=null)
            {
                console.log(result);
                res.send(result);
            }
            else{
                console.log('no bookings');
            }
        }
    });




});

router.get('/mywallet/:username',(req,res) => {
  
    console.log('inside getbalance');
    console.log(req.params.username);

    connection.query("select balance from users where name='"+req.params.username+"'",(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            {
                console.log(result);
                res.send(JSON.stringify(result[0]));
                console.log('printing result');
                console.log(JSON.stringify(result[0]));
            }
        }
    });
    
});

router.put('/mywallet/:username/:balance',(req,res) => {
  
    console.log('inside possst');
    console.log(req.params.username);
    console.log('printing the new balance');
    console.log(req.params.balance);
    connection.query("update users set balance="+req.params.balance+" where name='"+req.params.username+"'",(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            {
                console.log("in update balance");
            
            }
        }
    });
    
});

router.delete('/book_tickets/mybook/:username/:id',(req,res) => {
    //var dojo = doj.toString();
    connection.query("delete from bookings where booking_id="+req.params.id,(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            {
                console.log("in update balance");
            
            }
        }
    });

    
});

router.get('/book_tickets/bus_list/:username/:source/:destination/:doj/:id',(req,res) => {
    //var dojo = doj.toString();
    connection.query("select sum(nos) as seat from bookings where bus_id="+req.params.id+" and doj='"+req.params.doj+"'",(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            {
                res.send(JSON.stringify(result[0]));
                console.log(result);
            }
        }
    });

    
});
router.get('/book_tickets/bus_list/:id',(req,res) => {
    //var dojo = doj.toString();
    connection.query("create or replace procedure p1 as begin select sum(nos) as seat from bookings where bus_id="+req.params.id,(err,result)=>{
        if(err)console.log(err);
        else{
            if(result[0]!=null)
            {
                res.send(JSON.stringify(result[0]));
                console.log(result);
            }
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