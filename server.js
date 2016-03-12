/**
 * Created by root on 2/6/16.
 */

var express         = require('express');
var https           = require('https');
var http            = require('http');
var app             = express();
var onload          = require('./scripts/onload.js');
var fs              = require('fs');
var session         = require('express-session');
var cookieParser    = require('cookie-parser');
var SQLiteStore     = require('connect-sqlite3')(session);
var bodyParser      = require('body-parser')
var sqlite3         = require('sqlite3').verbose();
var db              = require('./models/index.js');

SECRET = 'S3CR37';

SQLiteStoreOptions = {
    table   : 'sessions',
    db      : 'sessionsDB',
    dir     : './db'
};

cookieOptions = {
    maxAge  : 7 * 24 * 60 * 60 * 1000,
    secure  : true
};

sessionOptions = {
    store               : new SQLiteStore(SQLiteStoreOptions),
    secret              : SECRET,
    cookie              : cookieOptions,
    resave              : false,
    saveUninitialized   : false
};

var httpOptions = {
    key                 : fs.readFileSync('./credentials/server.key'),
    cert                : fs.readFileSync('./credentials/server.crt'),
    ca                  : fs.readFileSync('./credentials/ca.crt'),
    requestCert         : true,
    rejectUnauthorized  : false
};

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(SECRET));
app.use(session(sessionOptions));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


shared = {app: app, db: db};

var rs = require('./routes.js')(shared);

app.post('/Login',function(req,res){
    console.log("POST - login")
    db['User'].findOne({ where: {username: req.body.username}, include : db['Account'] }).then(function(user){
        if (user) {
            user.validate(req.body.password, function(success){
                if (success) {
                    console.log("success")
                    req.session.loggedIn = true;
                    req.session.username = req.body.username;
                    res.send({redirect: true, url: '/'});
                } else {
                    res.send({redirect: false});
                }
                });
        } else {
            console.log(req.body.username, " not found");
            res.send();
        }
    });
});

app.post('/Logout',function(req,res){
    console.log("POST - Logout");
    req.session.loggedIn = false;
    req.session.username = null;
    res.send({redirect: true, url: '/'});
});

app.post('/Register',function(req,res){
    console.log("POST - Register")
    console.log("Cookies: ", req.cookies);
    db['User'].alreadyRegistered(
            req.body.username,
            function() {db['User'].create({ //Success: No account exists - register
                username: req.body.username,
                Account : {
                    password: req.body.password
                }
            }, {
                include: [ db['Account'] ]
            }).done(function() {
                    console.log("success: Account created")
                    req.session.loggedIn = true;
                    req.session.username = req.body.username;
                    res.send({redirect: true, url: '/'});
                }
            )},
            function() {
                //res.session.loggedIn = false;
                console.log("Failure: Account already exists")
                res.send('Response done');
            }  //Failure: Account already Exists
    )
});

https.createServer(httpOptions, app).listen(443, function() {
    console.log("Secure Express server listening on port 443");
});

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);


function renderSidebar(req, renderCB){
    console.log("rendering Siderbar");
    var sidebar = [
        {button: {id:'foo'}, text: 'foo'},
        {button: {id:'bar'}, text: 'bar'},
        {button: {id:'logoutButton'}, text: 'Logout'},
    ];
    if(req.session.loggedIn)    {
        return db['User'].findOne({ where: {username: req.session.username} })
            .then( function(user) {
                if(user.userType == "admin")    {
                    sidebar.push({button: {id:'forumAdminButton', href: '/forumAdmin'}, text: 'Forum Admin'});
                }
            }).then(function(){
                renderCB(sidebar);
        });
    } else {
        renderCB(sidebar);
    }
}

app.get('/', function(req, res) {
    console.log("GET")
    renderSidebar(req, function(sidebar) {
        res.render('index',
            { title : 'Home', message: 'Text Body', loggedIn: req.session.loggedIn, renderedSidebar: sidebar}
        );
    });

});



//TODO: refresh from login
//TODO: validate usernames/ passwords etc.
//TODO: Separate routes into different files