/**
 * Created by root on 3/16/16.
 */


module.exports = {
    renderJade: function (title, contentType, content, loggedIn, renderedSidebar) {
        return {
            "title": title,
            "contentType": contentType,
            "content": content,
            "loggedIn": loggedIn,
            "renderedSidebar": renderedSidebar
        }
    },
    renderSidebar: function(db, req, renderBodyCB){
        var sidebar = [
            {button: {id:'foo'}, text: 'foo'},
            {button: {id:'bar'}, text: 'bar'},
            {button: {id:'logoutButton'}, text: 'Logout'},
        ];
        if(req.session.loggedIn)    {
            return db['User'].findOne({ where: {username: req.session.username} })
                .then( function(user) {
                    if(user.userType == "admin")    {
                        sidebar.push({button: {id:'forumAdminButton', href: '/forumAdmin'}, text: 'Forum Admin'});
                    }
                }).then(function(){
                    renderBodyCB(sidebar);
                });
        } else {
            renderBodyCB(sidebar);
        }
    }
};