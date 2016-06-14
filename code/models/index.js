'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};
var sequelize = null;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


function readModels() {
    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(function (file) {
            var model = sequelize['import'](path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
}

function officalInitaliseDb() {
    return sequelize
        .sync({force: true})
        .then(function (err) {
                console.log('It worked!');
                db['User'].create({
                        username: 'Ben',
                        userType: 'admin',
                        Account: {
                            password: 'Test'
                        }
                    }, {
                        include: [db['Account']]
                    }
                )
                .then(function (user) {
                    db['ForumThread'].create(
                        {
                            title: "Forums First Thread",
                            content: "Thread Content",
                            author: 'Ben'
                        })
                    .then(function (threads){
                        db['ForumSection'].create(
                            {
                                section: "First Section",
                            });
                        })
                        .then(function (sections){
                            db['ForumBoard'].create(
                                {
                                    board: "First Board",
                                    description: "Forums First Board"
                                });
                        });
                });
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
}

module.exports = function(initaliser){
    readModels();
    if(!initaliser) {
        return officalInitaliseDb().then(function(resolved){
            return db
        });
    } else{
        return initaliser(sequelize, db).then(function(resolved){
            return db
        });
    }
}
