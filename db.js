const MongoClient=require('mongodb').MongoClient;
const ObjectID=require('mongodb').ObjectID;

const dbName="test";
const url="mongodb://abhi:abhijeeth@cluster0-shard-00-00-8qxkw.mongodb.net:27017,cluster0-shard-00-01-8qxkw.mongodb.net:27017,cluster0-shard-00-02-8qxkw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const mongoOptions={useNewUrlParser:true};

const state={
    db:null
};

const connect = (cb)=>
{
    if(state.db) cb();
    else
    {
        MongoClient.connect(url,mongoOptions,(err,client)=>
        {
            if(err)
            cb(err);
            else
            {
                state.db=client.db(dbName);
                cb();
            }
        });
    }
}

const getPrimaryKey=(_id)=>
{
    return ObjectID(_id);
}

const getDb=()=>
{
    return state.db;
}

module.exports={getDb,connect,getPrimaryKey};