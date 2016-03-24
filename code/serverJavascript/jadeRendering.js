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
    }
module.exports.forumAdminSb = function(db, req, res, template, bodyToRender){
        module.exports.stdSb(db, req, res, template, bodyToRender);
    }
module.exports.JSidebar = function(buttons){
        if(buttons == undefined){
            this.buttons = [];
        } else {
            this.buttons = buttons;
        }
    }
module.exports.JSidebar.prototype.addButton = function(button){
    this.buttons.push(button);
}
module.exports.JButton = function(attributes, text) {
        this.attributes = attributes;
        this.text = text;
    }
module.exports.JTemplate = function(title, contentType, content, loggedIn, sidebar, renderer){
        this.title = title;
        this.contentType = contentType;
        this.content = content;
        this.loggedIn = loggedIn;
        this.siderbar = sidebar;
        this.render = renderer
    },

module.exports.StandardSb=function() {
        this.addButton(new module.exports.JButton({id:'foo'}, 'foo'));
        this.addButton(new module.exports.JButton({id:'bar'}, 'bar'));
    }

module.exports.StandardSb.prototype= new module.exports.JSidebar();
module.exports.StandardSb.constructor = module.exports.StandardSb;