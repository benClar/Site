/**
 * Created by root on 3/12/16.
 */

"use strict"

var refs            = require("./config/htmlrefs.js");
var jRend           = require('./serverJavascript/jadeRendering.js');

module.exports = function(shared){

    shared.app.get(refs.FORUM_ADMIN, function(req,res){
        console.log("GET - Forum Admin");
        var template = new jRend.StdTemplate(shared.db, req, 'BoardManagerBody', new jRend.ForumAdminContent(shared.db, req));
        var renderer = new jRend.Renderer(res, template);
        renderer.render();
    });
}
