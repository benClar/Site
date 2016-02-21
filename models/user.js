/**
 * Created by root on 2/21/16.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsToMany(models.MilitaryWeapon, {through: 'UserMilitaryWeapon'})
            }
        }
    });

    return User;
};