/**
 * Created by root on 3/24/16.
 */

"use strict"

var test = require("unit.js");
var jRend = require("../jadeRendering");
var mocha = require("mocha");

describe('Jade rendering', function() {
    var db = null;
    beforeEach(function(done) {
        var init = function (sequelize, db) {
            sequelize
                .sync({force: true})
                .then(function (err) {
                    return db['ForumSection'].create({
                        section: "testSection"
                    });
                }).then(function (err) {
                return db['ForumBoard'].create({
                    board: "testBoard",
                    description: "Test Description",
                    ForumSectionSection: "testSection"
                });
            }).then(function () {
                done();
            });
        }
        db = require("../../models/index")(init);
    });
    it('Forum Admin Content', function() {
        var mockedReq = {};
        var content = new jRend.ForumAdminContent(db, mockedReq);
        content.setBoards().then(function(content){
            test.string(content[0]['board']).is('testBoard');
            test.string(content[0]['description']).is('Test Description');
        });
    });
});
