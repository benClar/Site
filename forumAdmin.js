/**
 * Created by root on 3/12/16.
 */

module.exports = function(shared){


    function renderForumAdmin(res){

    }

    function renderForumAdminSidebar(){

    }

    shared.app.get('/forumAdmin', function(req,res){
        console.log('form admin get');
        console.log(shared.db)
        renderForumAdmin(res);
    });

}
