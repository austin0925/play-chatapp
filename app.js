var express = require("express");
var app = express();

app.set("views", "./views");
app.set('view engine', 'jade');

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/', function(req, res){
    // res.send('hello worlds, make better worlds!');
    res.render("index", { title: "Home"});
});

app.get('/admin/rooms', function(req, res){
    // res.send('hello worlds, make better worlds!');
    res.render("rooms", { title: "Admin Rooms"});
});

app.listen(3000, function(){
    console.log('Chat app listening on port 3000!');
});