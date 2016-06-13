/**
 * Created by root on 5/8/16.
 */

"use strict"

var modelrefs = require('../config/modelrefs');


module.exports = function(sequelize, DataTypes) {
    var ForumBoard = sequelize.define(modelrefs.BOARD_TABLE, {
        board: {type: DataTypes.STRING, primaryKey: true},
        description: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function (models) {
                ForumBoard.belongsToMany(models.User, { through: 'ForumBoardMods'})
            }
        },
        instanceMethods: {

        }
    });
    return ForumBoard;
};