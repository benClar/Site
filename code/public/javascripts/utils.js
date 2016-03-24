/**
 * Created by root on 3/5/16.
 */

"use strict";

function formToDict(formData){
    return formData.reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    },{});
}

function ajaxRedirect(response){
    var res = $.parseJSON(response)
    if (res['redirect'] == true) {
        window.location = res['url'];
    }
}