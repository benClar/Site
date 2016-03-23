/**
 * Created by root on 3/16/16.
 */


module.exports = {
    renderJade: function (db, req, res, template, title, contentType, content, loggedIn, renderWithSidebar) {
            var body=  function(siderbar){
                return {
                    "title": title,
                    "contentType": contentType,
                    "content": content,
                    "loggedIn": loggedIn,
                    "renderedSidebar": siderbar
                }
            }
        renderWithSidebar(db, req, res, template, body);
    },
    stdSb: function(db, req, res, template, bodyToRender){
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
    },
    forumAdminSb: function(db, req, res, template, bodyToRender){
        module.exports.stdSb(db, req, res, template, bodyToRender);
    }
};