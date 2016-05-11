/**
 * Created by root on 5/8/16.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var ForumThread = sequelize.define('ForumThread', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        author: DataTypes.STRING,
    }, {
        classMethods: {

        }
    });
    return ForumThread;
};



// e.g. creating and finding
//db['Thread'].create(
//    {
//        title: "Forums First Thread",
//        content: "Thread Content",
//        author: 'Ben'
//    }).then(function(thread){
//    db['Thread'].findAll({
//        where: {
//            "author": 'Ben'
//        }
//    }).then(function(results){
//        console.log(results);
//    })
//});