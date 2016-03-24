/**
 * Created by root on 3/5/16.
 */

"use strict";

function eventListeners_loggedIn(){
    document.getElementById("logoutButton").addEventListener("click", function(){
        submitPost("/Logout", null, ajaxRedirect);
    });

    var forumAdmin = document.getElementById("forumAdminButton");
    if(forumAdmin){
        //forumAdmin.addEventListener("click", function(){
        //    submitGet("/forumAdmin", null); //TODO: Maybe move the test for inclusion of this to server side
        //});
    }

}

(function(window, document, undefined){

// code that should be taken care of right away

    window.onload = loggedinInit;
    function loggedinInit(){
        eventListeners_loggedIn();
    }

})(window, document, undefined);