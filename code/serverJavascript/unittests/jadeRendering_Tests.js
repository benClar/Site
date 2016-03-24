/**
 * Created by root on 3/24/16.
 */

var test = require("unit.js");
var jRend = require("../jadeRendering");
var mocha = require("mocha")

describe('Creating Standard Sidebar', function() {
        var stdSb = new jRend.StandardSb();
        test
            .string(stdSb.buttons[0].id)
            .is(foo)
    });
