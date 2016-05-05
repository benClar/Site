/**
 * Created by root on 5/5/16.
 */

var test = require("unit.js");
var ll = require("../linkedlist");
var mocha = require("mocha")

describe('Linked List Testing', function() {
    it("Appending to list", function(){
        var items = [1,2,3,4]
        var list = new ll.LinkedList(items)
        test.number(list.list.item).is(1);
        test.number(list.list.next.item).is(2);
    })
});