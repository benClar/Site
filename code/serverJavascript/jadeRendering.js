/**
 * Created by root on 3/16/16.
 */
"use strict";

function JSidebar(buttons){
        if(buttons == undefined){
            this.buttons = [];
        } else {
            this.buttons = buttons;
        }
}

JSidebar.prototype.addButton = function(button){
    console.log("Adding Button");
    console.log(button.attributes.id)
    this.buttons.push(button);
}

function JButton(attributes, text) {
        this.attributes = attributes;
        this.text = text;
 }

function JTemplate(template, title, contentType, content, loggedIn, sidebar){
        this.template = template; //Jade template file
        this.contents =
        {
            title: title, // Page title
            contentType: contentType, //Mixin for page content
            content: content, //params to mixin page content
            loggedIn: loggedIn,
            sidebar: sidebar
        };
}


function Renderer(template, res){
    this.template = template;
    this.res = res;
}

Renderer.prototype.render = function(){
    var bRender = this.res.render.bind(this, this.template.template, this.template.contents);
    this.template.contents.sidebar.setAdmin(bRender);
};

function StdTemplate(db, req){
    this.db = db;
    this.req = req;
    JTemplate.call(this,
        'index',
        'Home',
        'standardBody',
        'Text',
        req.session.loggedIn,
        new StandardSb(req, db),
        new Renderer(db, req)
    );
}

StdTemplate.prototype = Object.create(JTemplate.prototype);
StdTemplate.prototype.constructor = StdTemplate;

function StandardSb(req, db) {

    this.sidebar = new JSidebar();
    this.buttons = this.sidebar.buttons;
    this.sidebar.addButton(new module.exports.JButton({id: 'foo'}, 'foo'));
    this.sidebar.addButton(new module.exports.JButton({id: 'bar'}, 'bar'));
    if(req.session.loggedIn) {
        this.sidebar.addButton(new module.exports.JButton({id: 'logoutButton'}, 'Logout'));
    }
    this.req = req;
    this.db = db;
}

StandardSb.prototype.setAdmin = function(cb){
    var stdSB = this;
    this.db['User'].findOne({ where: {username: this.req.session.username}}).then(function(user)
    {
        if (user && user.userType == "admin") {
            stdSB.sidebar.addButton(new module.exports.JButton({
                id: 'forumAdminButton',
                href: '/forumAdmin'
            }, 'Forum Admin'));
        }
        cb();
    });
};

module.exports.JSidebar = JSidebar;
module.exports.JButton = JButton;
module.exports.JTemplate  = JTemplate;
module.exports.Renderer = Renderer;
module.exports.StandardSb = StandardSb;
module.exports.StdTemplate = StdTemplate;