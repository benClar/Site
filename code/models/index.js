'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize
    .sync({ force: true })
    .then(function(err) {
        console.log('It worked!');

        db['User'].create({
            username: 'Ben',
            userType: 'admin',
            Account : {
                password: 'Test'
            }
        }, {
            include: [ db['Account'] ]
            }
        ).then(function(user){
            db['Thread'].create(
                {
                    title: "Forums First Thread",
                    content: "Thread Content",
                }).then(function(thread) {
                thread.setAuthor("Ben").then(function (thread) {
                    thread.save()
                });
            });
        });

    }, function (err) {
        console.log('An error occurred while creating the table:', err);
    });

module.exports = db;
