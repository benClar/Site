/**
 * Created by root on 2/21/16.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {type: DataTypes.STRING, primaryKey: true},
        userType: {
            type:   DataTypes.ENUM(),
            values: ['user', 'moderator', 'admin'],
            defaultValue: 'user'
        }
        //email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                User.belongsToMany(models.ForumBoard, {through: 'UserMilitaryWeapon'});
                User.belongsTo(models.Account);
                User.hasMany(models.ForumThread, {foreignKey: 'author'});
                User.belongsToMany(models.ForumBoard, {as:'moderator', through: 'ForumBoardMods'});
                User.belongsToMany(models.ForumSection, {as:'superModerato', through: 'SectionSuperModerators'});
            },
            alreadyRegistered: function(username, success, fail) {
                User.findAndCountAll({where: {'username': username}}).then(function (result) {
                    if(result.count == 1){
                        console.log("Error: User Already Exists");
                        fail();
                    } else {
                        console.log("Success: Creating User");
                        success();
                    }
                });
            }
        },
        instanceMethods: {
            validate: function(pwd, cb) {
                return this.Account.compare(pwd, cb)
            },

        }
    });
    return User;
};