/**
 * Created by root on 2/25/16.
 */

var crypto = require('crypto');
SALT_SIZE = 8
module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
        salt: {
            type: DataTypes.TEXT('medium'),
            defaultValue: crypto.randomBytes(SALT_SIZE).toString('hex')
        },
        password:   {
            type: DataTypes.TEXT,
            set:    function(pw)  {
                var hash = crypto.createHash('sha256');
                var s = this.getDataValue('salt');
                hash.update(pw + s);
                this.setDataValue('password', hash.digest('hex'));
            }
        }
    }, {
        classMethods: {
            //associate: function(models) {
            //    Account.belongsTo(models.User)
            //},
        },
        instanceMethods: {
            compare: function(pwd) {
                var hash = crypto.createHash('sha256');
                hash.update(pwd + this.salt)
                if (this.password == hash.digest('hex')) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    });

    return Account;
};
// TODO Hook up register button
// TODO figure out how to save records: done - remove force on sync of sequelize
// TODO validating passwords
// TODO testing