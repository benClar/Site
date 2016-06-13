/**
 * Created by root on 3/16/16.
 */
"use strict";

var Promise         = require("bluebird");
var ll              = require("./linkedlist");
var refs            = require("../config/htmlrefs");
var modelrefs       = require('../config/modelrefs');
// links


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
        this.res.render(this.template.template, this.template.contents)
    };

    var innerRenderB = innerRender.bind(this);

    var toRenderList = this.template.getRenderables();

    var lastRender = function(renderable){
        if(renderable === null){
            // no more functions required for rendering,
            // call jade render.
            return innerRenderB;
        } else {
            return renderable;
        }
    };
    for(var i = 0; i < toRenderList.length; i++){
        // iterate through each object's renderables and call
        var invocator = toRenderList[i]['invoc'];
        var renderables = toRenderList[i]['renderables'];
        for(var toRender = renderables.next(); toRender;){
            toRender.call(invocator).then(lastRender(toRender = renderables.next()));
        }
    }

};

function StdTemplate(db, req, contentMixin, content){
    this.db = db;
    this.req = req;
    // Call parent constructor
    JTemplate.call(this,
        'index',
        'Home',
        contentMixin,
        content,
        req.session.loggedIn,
        new StandardSb(db, req)
    );
    this.renderables = new ll.LinkedList()
}

StdTemplate.prototype = Object.create(JTemplate.prototype);
StdTemplate.prototype.constructor = StdTemplate;

StdTemplate.prototype.getRenderables = function()  {
    // Returns list of asynchronous functions that need to
    // execute before template rendering can be done
    return [{'invoc': this, 'renderables': this.renderables},
            {'invoc': this.contents.sidebar, 'renderables':this.contents.sidebar.renderables},
            {'invoc': this.contents.content, 'renderables':this.contents.content.renderables}];
    //return this.renderables.join([this.contents.sidebar.renderables]);
}

//TODO: Just a default content object for now: what will the standard one look like?
function HomeContent(text, db, req){
    this.text = text;
    this.db = db;
    this.req = req;
}

function ForumAdminContent(db, req){
    this.settableAttr = [modelrefs.BOARD_TABLE, modelrefs.SECTION_TABLE];
    this.sections = [];
    this.boards = [];
    this.db = db;
    this.req = db;
    this.renderables = new ll.LinkedList([this.setForumStructures]);
}

ForumAdminContent.prototype.setForumStructures = function(){

    var schemaToAttrMap = {}
    schemaToAttrMap[modelrefs.BOARD_TABLE] = 'boards';
    schemaToAttrMap[modelrefs.SECTION_TABLE] = 'sections';

    var setboards = function(attr, data){
        console.log("Setting Forum Admin Attribute");
        console.log(attr);
        this[schemaToAttrMap[attr]] = this.db.Sequelize.Promise.map(data, function(rec){return rec.toJSON()});
        return this[schemaToAttrMap[attr]];
    }

    var getData = function(attr) {
        var setboardsB = setboards.bind(this, attr);
        return this.db[attr].findAll({where: {}}).then(setboardsB);
    }
    var getDataB = getData.bind(this);
    return Promise.each(this.settableAttr, getDataB)
}

function StandardSb(db, req) {

    JSidebar.call(this);
    this.db = db;
    this.req = req;
    this.addButton(new JButton({id: 'Community'}, 'Community'));
    this.addButton(new JButton({id: 'Account'}, 'Account'));
    this.addButton(new JButton({id: 'Barracks'}, 'Barracks'));
    this.addButton(new JButton({id: 'Alliance'}, 'Alliance'));
    this.addButton(new JButton({id: 'Attack'}, 'Attack'));
    if(this.req.session.loggedIn) {
        this.addButton(new module.exports.JButton({id: 'logoutButton'}, 'Logout'));
    }
    this.renderables = new ll.LinkedList([this.setAdmin]);
}

StandardSb.prototype = Object.create(JSidebar.prototype);
StandardSb.prototype.constructor = StandardSb;

StandardSb.prototype.setAdmin = function(){

    var setAdmin = function(user){
        if (user && user.userType == "admin") {
            this.addButton(new JButton({
                id: 'forumAdminButton',
                href: refs.FORUM_ADMIN
            }, 'Forum Admin'));
        }
        return Promise.resolve(this); // TODO: Should this resolving be user?
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
module.exports.ForumAdminContent = ForumAdminContent;
module.exports.HomeContent = HomeContent;