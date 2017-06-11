var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");

var router = express.Router();

var rooms = require("./data/rooms.json");

module.exports = router;

router.get('/rooms', function (req, res) {
    // res.send('hello worlds, make better worlds!');
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

router.route('/rooms/add')
    .get(function (req, res) {
        res.render("add");
    })

    .post(function (req, res){

        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room);

        res.redirect(req.baseUrl + "/rooms");   //abssu
        // res.redirect("./");  //this will redirect the page to the relative self dir.
    });

router.route('/rooms/edit/:id')
    .all(function(req, res, next){
        var roomId = req.params.id;

        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            // res.sendStatus(404);
            next(new Error("Oh NO"));
            return;
        }
        res.locals.room = room;
        next();
    })
    .get(function (req, res) {
        res.render("edit");
    })
    .post(function (req, res) {
        res.locals.room.name = req.body.name;

        res.redirect(req.baseUrl + "/rooms");
    });


router.get("/rooms/delete/:id", function (req, res) {
    var roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);

    res.redirect(req.baseUrl + "/rooms");
    // res.json(roomId);
});
