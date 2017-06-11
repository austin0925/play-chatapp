var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");
var bodyParser = require("body-parser");

app.set("views", "./views");
app.set('view engine', 'jade');

var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(require('morgan')("combined", {stream: accessLogStream}));

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

require('express-debug')(app, {});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    console.log(`Incoming request: ${req.url}`);
    next();
});

app.get('/', function (req, res, next) {
    throw new Error("oh no");
    console.log(`Incoming request: second`);
    res.render("home", {title: "Home"});
    next();
});

app.get('/admin/rooms', function(req, res){
    // res.send('hello worlds, make better worlds!');
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.get('/admin/rooms/add', function(req, res){
    res.render("add");
});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);
app.use("/admin", function (req, res, next) {
    console.log('admin request: ' + req.url);
    next();
})

var apiRouter = require('./api');
app.use("/api", apiRouter);

app.use(function (error, req, res, next) {
    console.error(error);
    res.send("Super secret error handler.")
});

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});
