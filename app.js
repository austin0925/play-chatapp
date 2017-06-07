var express = require("express");
var app = express();

var rooms = require("./data/rooms.json");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");

app.set("views", "./views");
app.set('view engine', 'jade');

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function handler(req, res){
    // res.send('hello worlds, make better worlds!');
    res.render("index", { title: "Home"}, function (error, html){
        console.log(html);
    });
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

app.post('/admin/rooms/add', function(req, res){
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);

    res.json(room);
    //res.render("nothing");
});

app.listen(3000, function(){
    console.log('Chat app listening on port 3000!');
});