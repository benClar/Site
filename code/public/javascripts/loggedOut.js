/**
 * Created by root on 3/5/16.
 */

"use strict";

function eventListeners_loggedOut(){
    document.getElementById("sendReg").addEventListener("click", function(){
        sendRegistration('/Register')
    });
    document.getElementById("sendLogin").addEventListener("click", function(){
        sendRegistration('/Login')
    });
}

function sendRegistration(url){
    var frm = $('#loginform').serializeArray();
    var data = JSON.stringify(formToDict(frm));
    submitPost(url, data, ajaxRedirect);
}

(function(window, document, undefined){

// code that should be taken care of right away

    window.onload = init;
    function init(){
        eventListeners_loggedOut();
    }

})(window, document, undefined);