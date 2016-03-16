/**
 * Created by root on 3/12/16.
 */

module.exports = function(shared){


    function renderForumAdmin(req, res){
        shared.jRend.renderJade("Forum Board Manager", "boardManagerBody", req.session.loggedIn, sidebar);
    }

    function renderForumAdminSidebar(){

    }

    shared.app.get('/forumAdmin', function(req,res){
        console.log('form admin get');
        renderForumAdmin(req, res);
    });

}
