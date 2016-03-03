/**
 * Created by root on 2/7/16.
 */
"use strict";


function eventListeners(){
    document.getElementById("sendReg").addEventListener("click", function(){
        submit("sendReg");
    });
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
            console.log("Response Recieved");
            console.log(xhttp.responseText);
        }
    };
    var frm = $(document.getElementById('loginform'));
    var data = JSON.stringify(frm.serializeArray());
    console.log(data)
    var data = {username: "someone", password:'test'}
    xhttp.open("POST", "https://localhost:443/Register")
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));
}