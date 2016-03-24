/**
 * Created by root on 2/21/16.
 */

module.exports = function(sequelize, DataTypes) {
    var MilitaryWeapon = sequelize.define("MilitaryWeapon", {
        name: DataTypes.STRING,
        cost: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                MilitaryWeapon.belongsToMany(models.User, {through: 'UserMilitaryWeapon'})
            }
        }
    });
    return MilitaryWeapon;
};