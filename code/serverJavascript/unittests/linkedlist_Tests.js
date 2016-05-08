/**
 * Created by root on 5/5/16.
 */

"use strict";

var test = require("unit.js");
var ll = require("../linkedlist");
var mocha = require("mocha");

describe('Linked List Testing', function() {
    it("Creating list", function(){
        var items = [1, 2, 3, 4];
        var list = new ll.LinkedList(items);
        test.number(list.first.item).is(1);
        test.number(list.first.next.item).is(2);
        test.number(list.first.next.item).isNot(3);
    });
    it("Popping from list", function() {
        var items = [1, 2, 3, 4];
        var list = new ll.LinkedList(items);
        test.number(list.pop()).is(4);
        test.number(list.pop()).is(3);
        test.number(list.pop()).is(2);
    });
    it("Appending To list", function() {
        var list = new ll.LinkedList();
        list.append(1);
        list.append(2);
        test.number(list.first.item).is(1);
        test.number(list.last.item).is(2);
    });
    it("Iterating through list with next()", function() {
        var items = [1, 2, 3, 4];
        var list = new ll.LinkedList(items);
        for(var ret = list.next(), item=0; ret; item++, ret=list.next()) {
            test.number(ret).is(items[item]);
        }
        // checking that doing a second iteration begins from the start again.
        for(var ret = list.next(), item=0; ret; item++, ret=list.next()) {
            test.number(ret).is(items[item]);
        }
    });
    it("joining two lists", function() {
        var items1 = [1, 2, 3, 4];
        var items2 = [5, 6, 7, 8];
        var list1 = new ll.LinkedList(items1);
        var list2 = new ll.LinkedList(items2);
        var list3 = list1.join([list2]);
        var items3 = items1.concat(items2);
        for (var i = 0; i < items3.length; i++) {
            test.number(list3.next()).is(items3[i]);
        }
    });
    it("joining empty list with non-empty list", function() {
            var items1 = [1, 2, 3, 4];
            var list1 = new ll.LinkedList(items1);
            var list2 = new ll.LinkedList();
            var list3 = list2.join([list1]);
            for(var i = 0; i< items1.length; i++){
                test.number(list3.next()).is(items1[i]);
            }
    });
});