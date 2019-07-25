const express=require('express');
const bodyParser=require('body-parser');
const users = require('./routes/api/users');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
const router = express.Router();
const mysql=require('mysql');
const port = process.env.PORT || 5000
const path = require('path');

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


app.use('/',users);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {

        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });

}

app.listen(port,()=>
{
    console.log(`server running on ${port}`);
});

module.exports = {connection};