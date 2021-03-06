var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

// Load config
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,{
   host : process.env.DB_HOST,
   dialect : 'mysql',
   timezone : '+09:00',
   operatorsAliases : Sequelize.Op,
   pool : {
       max : 5,
       min : 0,
       idle : 10000
   } 
});

let db = [];

fs.readdirSync(__dirname).filter(function(file){
    return file.indexOf('.js') && file !== 'index.js'
}).forEach(function(file){
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
})

Object.keys(db).forEach(function(modelName){
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



