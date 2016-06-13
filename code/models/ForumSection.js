/**
 * Created by root on 5/14/16.
 */

"use strict";

var modelrefs = require('../config/modelrefs');

module.exports = function(sequelize, DataTypes) {
    var ForumSection = sequelize.define(modelrefs.SECTION_TABLE, {
        section: {type: DataTypes.STRING, primaryKey: true},
    }, {
        classMethods: {
            associate :function(models) {
                ForumSection.hasMany(models.ForumBoard);
                ForumSection.belongsToMany(models.User, {through: 'SectionSuperModerators'});
            }
        }
    });
    return ForumSection;
};