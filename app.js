const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
const path=require('path');
const db=require('./db');
const Joi=require('joi');
const collection = "UserData";
const url="mongodb+srv://abhi:abhijeeth@cluster0-8qxkw.mongodb.net/test?retryWrites=true";
const assert = require('assert');

const UserSchema=Joi.object().keys({
    Username : Joi.string().required(),
    Password : Joi.string().min(5).required(),
    Email : Joi.string().email().required(),
    DOB : Joi.date().required(),
    M_No : Joi.string().min(10).max(10).required(),
    gender : Joi.string().required()
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'login.html'));
});

app.get('/signup',(req,res) => {
    res.sendFile(path.join(__dirname,'signup.html'));
});

app.get('/forgotpassword',(req,res) => {
    res.sendFile(path.join(__dirname,'forgotpassword.html'));
});

var result1=null;
db.connect((err)=>
{
    if(err)
    {
        console.log('unable to connect');
        process.exit(1);
    }
    else{
        app.listen(3000,()=>
        {
            console.log('listining to port 3000');
        });
    }
});

app.put('/:id',(req,res)=>
{
    const todoID=req.params.id;
    const userInput=req.body;
    db.getDb().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(todoID)},{$set : {todo : userInput.todo}},{returnOrginal: false},(err,result)=>
    {
        if(err) console.log("errrroorrr");
        else{
            res.json(result);
        }
    });
});


app.post('/',(req,res)=>
{
    db.getDb().collection(collection).findOne({
        Username : req.body.Username,
        Password : req.body.Password
    },(err,result)=>
    {
        if(err) console.log(errrr);
        else
        {
            result1=result;

        }
    });
    res.redirect('/a');
});


app.get('/a',(req,res)=>
{
    if(result1===null) res.send("pls check details");
    else{
        res.send('loggedin hurrayyyyyyy');
    }
});

app.post('/signup',(req,res)=>
{
    Joi.validate(req.body,UserSchema,(err,result)=>
    {
        if(err) console.log(err);
        else{
            db.getDb().collection(collection).insertOne({
                Username : req.body.Username,
                Password : req.body.Password,
                Email : req.body.Email,
                DOB : req.body.DOB,
                M_No : req.body.M_No,
                gender : req.body.gender
            },(err,result)=>
            {
                if(err) console.log('errrr');
                else
                {
                    console.log(result);
        
                }
            });
        }
    })

    res.redirect('/');
});