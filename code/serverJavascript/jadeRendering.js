/**
 * Created by root on 3/16/16.
 */


module.exports.renderJade = function (db, req, res, template, title, contentType, content, loggedIn, renderWithSidebar) {
            var body=  function(siderbar){
                return {
                    "title": title,
                    "contentType": contentType,
                    "content": content,
                    "loggedIn": loggedIn,
                    "renderedSidebar": sidebar
                }
            }
        renderWithSidebar(db, req, res, template, body);
    }
module.exports.stdSb = function(db, req, res, template, bodyToRender){
        var sidebar = [
            {button: {id:'foo'}, text: 'foo'},
            {button: {id:'bar'}, text: 'bar'},

        ];
        if(req.session.loggedIn)    {
            sidebar.push({button: {id:'logoutButton'}, text: 'Logout'})
            return db['User'].findOne({ where: {username: req.session.username} })
                .then( function(user) {
                    if(user.userType == "admin")    {
                        sidebar.push({button: {id:'forumAdminButton', href: '/forumAdmin'}, text: 'Forum Admin'});
                    }
                    res.render(template, bodyToRender(sidebar));
                });
        }
        res.render(template, bodyToRender(sidebar));
    };
module.exports.forumAdminSb = function(db, req, res, template, bodyToRender){
        module.exports.stdSb(db, req, res, template, bodyToRender);
    };
module.exports.JSidebar = function(buttons){
        if(buttons == undefined){
            this.buttons = [];
        } else {
            this.buttons = buttons;
        }
    };
module.exports.JSidebar.prototype.addButton = function(button){
    this.buttons.push(button);
};
module.exports.JSidebar.prototype.setAdmin = function(){
    this.addButton(new module.exports.JButton({id:'forumAdminButton', href: '/forumAdmin'}, 'Forum Admin'));
};

module.exports.JButton = function(attributes, text) {
        this.attributes = attributes;
        this.text = text;
    };
module.exports.JTemplate = function(template, title, contentType, content, loggedIn, sidebar, renderer){
        this.template = template; //Jade template file
        this.title = title; // Page title
        this.contentType = contentType; //Mixin for page content
        this.content = content; //params to mixin page content
        this.loggedIn = loggedIn;
        this.sidebar = sidebar;
        this.renderer = renderer;
};

module.exports.JTemplate.prototype.render = function(){
    this.renderer.render(this, this.sidebar);
}

module.exports.Renderer = function(db, req, res){
    this.db = db;
    this.req = req;
    this.res = res;
};

module.exports.Renderer.prototype.render = function(template, sidebar){
    var renderer = this;
    module.exports.isAdmin(this.db, this.req.session.username, sidebar, sidebar.setAdmin)
        .then(function(){
            renderer.res.render(template.template, template)
        });
}

module.exports.StandardSb = function(isLoggedIn) {
    this.addButton(new module.exports.JButton({id: 'foo'}, 'foo'));
    this.addButton(new module.exports.JButton({id: 'bar'}, 'bar'));
    if(isLoggedIn){
        this.addButton(new module.exports.JButton({id:'logoutButton'}, 'Logout'));
    }
    this.isAdmin = false;
};
module.exports.StandardSb.prototype = new module.exports.JSidebar();
module.exports.StandardSb.constructor = module.exports.StandardSb;

module.exports.isAdmin = function(db, username, caller, cb){
    return db['User'].findOne({ where: {username: username} })
        .then( function(user) {
            if(user.userType == "admin")    {
                cb.call(caller);
            }
        });
};

