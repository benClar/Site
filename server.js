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

app.post('/Login',function(req,res){
    console.log("POST - login")
    db['User'].findOne({ where: {username: req.body.username}, include : db['Account'] }).then(function(user){
        if (user) {
            if (user.validate(req.body.password)) {
                console.log("Login success")
            } else {
                console.log("Login failiure")
            }
        } else {
            console.log(req.body.username, " not found")
        }
    });
    res.send()
});

app.post('/Logout',function(req,res){
    console.log("POST - Logout");
    req.session.loggedIn = false;
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

app.get('/', function(req, res) {
    console.log("GET")
    console.log(req.url)
    console.log(req.session.loggedIn)
    res.render('index',
        { title : 'Home', message: 'Text Body', loggedIn: req.session.loggedIn}
    );
});

//TODO: refresh from login
//TODO: validate usernames/ passwords etc.
//TODO: Separate routes into different files