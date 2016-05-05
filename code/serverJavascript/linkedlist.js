/**
 * Created by root on 5/5/16.
 */

function LinkedList(items){
    this.list = null;
    for(var n = 0; n < items.length; n++){
        if(this.list == null){
            this.list = new Node(items[n]);
        } else {
            this.append(items[n]);
        }
    }
};

LinkedList.prototype.append = function(item){
    var curr = this.list;
    while(curr.next != null){
        curr = curr.next;
    }
    curr.next = new Node(item);
};

function Node(item, next){

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
};

module.exports.LinkedList = LinkedList;