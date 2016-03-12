/**
 * Created by root on 2/7/16.
 */
"use strict";


function eventListeners(){
    //document.getElementById("sendReg").addEventListener("click", function(){
    //
    //
    //
    //});
}

(function(window, document, undefined){

// code that should be taken care of right away

    window.onload = init;
    function init(){
        eventListeners();
    }

})(window, document, undefined);

function submitPost(url, data, cb){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Response Recieved");
            console.log(xhttp.responseText)
            if(cb){
                cb(xhttp.responseText);
            }

        }
    };
    xhttp.open("POST", "https://localhost:443" + url)
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(data);
}

function submitGet(url, cb, dataType) {
    var request = {
        url: url,
        dataType: dataType
    }
    if(cb){
        request['success'] = cb;

    }
    $.ajax(request);
}