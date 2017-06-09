var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");

var router = express.Router();

var rooms = require("./data/rooms.json");
module.exports = router;

router.get('/admin/rooms', function (req, res) {
    // res.send('hello worlds, make better worlds!');
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

router.get('/admin/rooms/add', function (req, res) {
    res.render("add");
});

router.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);

    res.redirect("/admin/rooms");
    //res.json(room);
    //res.render("nothing");
});

router.get('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);

    if (!room) {
        res.sendStatus(404);
        return;
    }

    res.render("edit", {room});
})

router.post('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);

    if (!room) {
        res.sendStatus(404);
        return;
    }
    room.name = req.body.name;

    res.redirect("/admin/rooms");
    //res.json(room);
    //res.render("nothing");
});

router.get("/admin/rooms/delete/:id", function (req, res) {
    var roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);

    res.redirect("/admin/rooms");
    // res.json(roomId);
})
