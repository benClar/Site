/**
 * Created by root on 3/5/16.
 */

"use strict";

function eventListeners_loggedIn(){
    document.getElementById("logoutButton").addEventListener("click", function(){
        submit("/Logout", null);
    });
}

(function(window, document, undefined){

// code that should be taken care of right away

    window.onload = loggedinInit;
    function loggedinInit(){
        eventListeners_loggedIn();
    }

})(window, document, undefined);