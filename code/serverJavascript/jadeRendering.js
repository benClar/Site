/**
 * Created by root on 3/16/16.
 */
"use strict";

var Promise         = require("bluebird");

function JSidebar(buttons){
        if(buttons == undefined){
            this.buttons = [];
        } else {
            this.buttons = buttons;
        }
}

JSidebar.prototype.addButton = function(button){
    this.buttons.push(button);
}

function JButton(attributes, text) {
        this.attributes = attributes;
        this.text = text;
 }

function JTemplate(template, title, contentType, content, loggedIn, sidebar){
        this.template = template;       // Jade template file
        this.contents =
        {
            title: title,               // Page title
            contentType: contentType,   // Mixin for page content
            content: content,           // params to mixin page content
            loggedIn: loggedIn,
            sidebar: sidebar
        };
}

function Renderer(res, template){
    this.template = template;
    this.res = res;
}


Renderer.prototype.render = function(){

    var innerRender = function(sb){
        console.log(sb);
        this.res.render(this.template.template, this.template.contents)
    };

    var innerRenderB = innerRender.bind(this);

    this.template.contents.sidebar.setAdmin().then(innerRenderB);
};

function StdTemplate(db, req){
    this.db = db;
    this.req = req;
    // Call parent constructor
    JTemplate.call(this,
        'index',
        'Home',
        'standardBody',
        'Text',
        req.session.loggedIn,
        new StandardSb(db, req)
    );
}

StdTemplate.prototype = Object.create(JTemplate.prototype);
StdTemplate.prototype.constructor = StdTemplate;

function StandardSb(db, req) {

    JSidebar.call(this);
    this.db = db;
    this.req = req;
    this.addButton(new JButton({id: 'foo'}, 'foo'));
    this.addButton(new JButton({id: 'bar'}, 'bar'));
    if(this.req.session.loggedIn) {
        this.addButton(new module.exports.JButton({id: 'logoutButton'}, 'Logout'));
    }
    this.toRender = [this.setAdmin];
}

StandardSb.prototype = Object.create(JSidebar.prototype);
StandardSb.prototype.constructor = StandardSb;


StandardSb.prototype.render = function(funcToRender){

    if(!toRender) {
        for (var item = 0, nextItem = 1; item < this.toRender.length; ) {
            if (nextItem < this.toRender.length){
                this.toRender(this.toRender[item]).then(this.render(this.toRender[next]))
            }


        }
    }

};

StandardSb.prototype.setAdmin = function(){

    var setAdmin = function(user){
        if (user && user.userType == "admin") {
            console.log("ISADMIN");
            this.addButton(new JButton({
                id: 'forumAdminButton',
                href: '/forumAdmin'
            }, 'Forum Admin'));
        }
        return Promise.resolve(this);
    };

    var setAdminB = setAdmin.bind(this); // Bind context to current object
    return this.db['User'].findOne({ where: {username: this.req.session.username}}).then(setAdminB);
};

module.exports.JSidebar = JSidebar;
module.exports.JButton = JButton;
module.exports.JTemplate  = JTemplate;
module.exports.Renderer = Renderer;
module.exports.StandardSb = StandardSb;
module.exports.StdTemplate = StdTemplate;