var express = require("express");
var app = express();
<<<<<<< HEAD
=======

<<<<<<< HEAD
var rooms = require("./data/rooms.json");
=======
>>>>>>> 2d62dc68308830bc79dd399a71589ebf36c6c055
var bodyParser = require("body-parser");
>>>>>>> 72a4c84c2fa504f2807d66dcefa953036150a154

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

<<<<<<< HEAD
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

app.post('/admin/rooms/add', function(req, res){
    res.render("nothing");
});
=======
var adminRouter = require("./admin");
app.use("/admin", adminRouter);
<<<<<<< HEAD
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
=======
>>>>>>> 72a4c84c2fa504f2807d66dcefa953036150a154

app.listen(3001, function(){
    console.log('Chat app listening on port 3001!');
});
>>>>>>> 2d62dc68308830bc79dd399a71589ebf36c6c055
