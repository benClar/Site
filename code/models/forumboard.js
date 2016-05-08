/**
 * Created by root on 5/8/16.
 */

"use strict"

module.exports = function(sequelize, DataTypes) {
    var ForumBoard = sequelize.define("ForumBoard", {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                //ForumBoard.hasMany(models.User);
            }
        },
        instanceMethods: {

        }
    });
    return ForumBoard;
};