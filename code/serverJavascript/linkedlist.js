/**
 * Created by root on 5/5/16.
 */

"use strict";

var assert = require('assert');

function LinkedList(items){
    this.first = null;
    this.last = null;
    this.curr = null;
    this.nextCalled = false;
    for(var n = 0; items && n < items.length; n++){
        if(this.first == null){
            this.first = new Node(items[n]);
            this.last = this.first;
        } else {
            this.append(items[n]);
        }
    }
};

LinkedList.prototype.append = function(item){
    if(this.last) {
        this.last.next = new Node(item, null, this.last);
        this.last = this.last.next;
    } else{
        assert(this.first == null, "if there is no last there should be no first");
        this.first = this.last = new Node(item)
    }
};


LinkedList.prototype.next = function(){
    // call to iterate through list, remembering previous node returned.
    var ret = null;
    if(this.first === null){
        // leave ret as null : empty list
    } else if(this.curr === null && !this.nextCalled){
        this.curr = this.first.next;
        this.nextCalled = true;
        ret = this.first.item;
    } else if(this.curr){
        ret = this.curr.item;
        this.curr = this.curr.next;
    } else if (this.curr === null && this.nextCalled){
        ret = null;
        this.nextCalled = false;
        ret = null;
    }
    return ret;
};

LinkedList.prototype.join = function(lists){
    // joins a list of linked lists together with current,
    // returning new linked list.
    var ret = new LinkedList();
    ret.first = this.first;
    ret.last = this.last;
    for(var i = 0; i < lists.length; lists++) {
        if(this.last) {
            ret.last.next = lists[i].first;
        } else {
            // this list is empty
            ret.last = lists[i].first;
            ret.first = lists[i].first;
        }
        if(lists[i].first){
            // only join list if list to join has nodes
            lists[i].first.prev = ret.last;
        }
    }
    return ret;
}

LinkedList.prototype.pop = function(index){
    var ret = null;
    if (!index){
        ret = this.last;
        this.last = this.last.prev;
        this.last.next = null;
    } else {
        throw "indexed pop not yet implemented";
    }
    return ret.item;
};

function Node(item, next, prev){
    if(item) {
        this.item = item;
    } else{
        this.item = null
    }

    if(next){
        this.next = next;
    } else {
        this.next = null;
    }
    if(prev){
        this.prev = prev;
    } else {
        this.prev = null;
    }
};

module.exports.LinkedList = LinkedList;