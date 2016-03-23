/**
 * Created by root on 3/12/16.
 */

module.exports = function(shared){


    function renderForumAdmin(req, res){
        shared.jRend.renderJade("Forum Board Manager", "boardManagerBody", req.session.loggedIn, shared.jRend.renderSidebar);
    }

    shared.app.get('/forumAdmin', function(req,res){
        shared.jRend.renderJade(shared.db, req, res, 'index', 'Home', "standardBody", 'Text Body', req.session.loggedIn, shared.jRend.stdSb);
    });

}
