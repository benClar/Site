/**
 * Created by root on 5/8/16.
 */

module.exports = function(sequelize, DataTypes) {
    var Thread = sequelize.define('Thread', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function (models) {
                Thread.belongsTo(models.User, {as :'author'});
            }
        }
    });
    return Thread;
};