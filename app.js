var express = require("express");
var app = express();

<<<<<<< HEAD
var rooms = require("./data/rooms.json");
=======
var bodyParser = require("body-parser");
>>>>>>> 72a4c84c2fa504f2807d66dcefa953036150a154

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
>>>>>>> 72a4c84c2fa504f2807d66dcefa953036150a154

app.listen(3001, function(){
    console.log('Chat app listening on port 3001!');
});