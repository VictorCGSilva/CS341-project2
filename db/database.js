const { MongoClient} = require('mongodb');
const dotEnv = require('dotenv');
dotEnv.config();
let db;

const conectDB = (callback) => {
    if(db) {
      console.log('Database is already initialized!!!');
      return callback(null, db);  
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client)=> {
            db = client;
            callback(null,db);
        })
        .catch((err)=>{
            callback(err);
        });
};

const getDB = () => {
    if(!db) {
        throw Error('Database not initialized!!!');
    }
    return db;
};
module.exports = {
    conectDB,
    getDB
};


