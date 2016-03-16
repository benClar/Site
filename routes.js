/**
 * Created by root on 3/12/16.
 */

var fs        = require('fs');

var exceptions = ['server.js', 'app.js']

module.exports = function(shared){
    fs.readdirSync(__dirname).forEach(function(f){
        if( f == __filename.split('/').slice(-1)[0] || exceptions.indexOf(f)  >= 0) return;
        if(f.split('.').slice(-1)[0] == 'js') {
            console.log('importing ./' + f);
            require('./' + f)(shared);
        }
    });
}
