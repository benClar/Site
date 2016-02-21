/**
 * Created by root on 2/7/16.
 */
"use strict";


function eventListeners(){
    //document.getElementById("sendLogin").addEventListener("click", function(){
    //    submit("sendLogin");
    //});
}

(function(window, document, undefined){

// code that should be taken care of right away

    window.onload = init;

    function init(){
        eventListeners();
    }

})(window, document, undefined);

function submit(sender){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("POST", "https://localhost:443/")
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}