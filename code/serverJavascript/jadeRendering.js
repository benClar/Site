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
    this.buttons.push(button);
}

function JButton(attributes, text) {
        this.attributes = attributes;
        this.text = text;
 }

function JTemplate(template, title, contentType, content, loggedIn, sidebar, renderer){
        this.template = template; //Jade template file
        this.contents =
        {
            title: title, // Page title
            contentType: contentType, //Mixin for page content
            content: content, //params to mixin page content
            loggedIn: loggedIn,
            sidebar: sidebar
        };
        this.renderer = renderer;
}

JTemplate.prototype.render = function(){
    this.renderer.render(this);
}

function Renderer(db, req, res){
    this.db = db;
    this.req = req;
    this.res = res;
}

Renderer.prototype.render = function(template){
    this.res.render(template.template, template.contents);
};

function StdTemplate(db, req, res){
    this.db = db;
    this.req = req;
    this.res = res;
    this.template = new JTemplate(
        'index',
        'Home',
        'standardBody',
        'Text',
        req.session.loggedIn,
        new StandardSb(req.session.loggedIn, isAdmin(this.db, req.session.username)),
        new Renderer(db, req, res)
    );
}

StdTemplate.prototype.render = function(){
    this.template.render();
};

function StandardSb(isLoggedIn, isAdmin) {

    this.sidebar = new JSidebar();
    this.buttons = this.sidebar.buttons;
    this.sidebar.addButton(new module.exports.JButton({id: 'foo'}, 'foo'));
    this.sidebar.addButton(new module.exports.JButton({id: 'bar'}, 'bar'));

    if(isLoggedIn){
        this.sidebar.addButton(new module.exports.JButton({id:'logoutButton'}, 'Logout'));
    }
    if(isAdmin){
        this.sidebar.addButton(new module.exports.JButton({id:'forumAdminButton', href: '/forumAdmin'}, 'Forum Admin'));
    }
}

function isAdmin(db, username){
    return db['User'].findOne({ where: {username: username} }).then(function(user)
    {
        if (user && user.userType == "admin") {
            return true;
        }
        return false;
    });
}

module.exports.JSidebar = JSidebar;
module.exports.JButton = JButton;
module.exports.JTemplate  = JTemplate;
module.exports.Renderer = Renderer;
module.exports.StandardSb = StandardSb;
module.exports.isAdmin = isAdmin;
module.exports.StdTemplate = StdTemplate;