/**
 * Created by root on 5/11/16.
 */
module.exports = function(sequelize, DataTypes) {
    var ForumPost = sequelize.define('ForumPost', {
        content: DataTypes.STRING,
        author: DataTypes.STRING,
    }, {
        classMethods: {
            associate :function(models) {
                ForumPost.belongsTo(models.ForumThread);
            }
        }
    });
    return ForumPost;
};