const { Event } = require("../models/event.model");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

module.exports = {
  getAllEventCreatedBy: async (req, res) => {
    const { emailcreateur } = req.params;
    const events = await Event.find({ emailcreateur });
    res.send(events);
  },
  getAllEvent: async (req, res) => {
    const events = await Event.find();
    res.send(events);
  },
  createEvent: async (req, res) => {
    console.log(req.file)
    const { titre, description, emailcreateur, phonecreateur, date, price } = req.body;
    console.log(req.body)
    console.log(req.body.Longitude)
    const event = new Event({ titre, description, Longitude: req.body.Longitude, Latitude: req.body.Latitude, emailcreateur, image: req.file.filename, phonecreateur, date, price });
    await event.save();
    res.send(event);
  },
  createEventWithoutImage: async (req, res) => {
    const { titre, description, date } = req.body;
    const event = new Event({ titre, description, date });
    await event.save();
    res.send(event);
  },
  createEventWithImage: async (req, res) => {
    console.log(req.file)
    const { titre, description, date, Longitude, Latitude } = req.body;

    const event = new Event({ titre, description, image: req.file.filename, date, Longitude, Latitude });
    await event.save();
    res.send(event);
  },
  updateEvent: (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    Event.updateOne(
      { _id: id },
      { titre: req.body.titre, description: req.body.description },
      function (err) {
        if (err) {
          console.log("failed");
        } else {
          console.log("success update");
        }
      }
    );
    return res.send("update");
  },

  deleteEvent: (req, res) => {
    console.log("en cour");
    const { id } = req.params;
    console.log(id);
    Event.findByIdAndRemove(id, function (err) {
      if (!err) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
    return res.send("deleted");
  },
  //camper participate to event app.put("/event/participate/:id"
  participateToEvent: async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    event.participants.push(req.body)
    console.log(req.body);
    await Event.findByIdAndUpdate(id, event)
    /*Event.updateOne({event}, function (err) {
      if (err) {
        console.log("failed");
      } else {
        console.log("success update");
      }
    });*/
    return res.send("update");
  },
  UserAlreadyParticipate: async (req, res) => {
    const { _id } = req.params
    const { email } = req.params
    console.log("hello")
    const userIsFoundInevent = await Event.findOne({ _id, participants: { $elemMatch: { email } } });
    console.log(userIsFoundInevent)
    if (userIsFoundInevent) {
      return res.json({ exist: true });
    }
    return res.json({ exist: false });
  },
  UsersParticipate: async (req, res) => {
    const { _id } = req.params
    console.log("hello")
    const event = await Event.findOne({ _id });
    console.log(event.participants.length)
    if (event.participants.length > 0) {
      return res.json({ usersExist: true });
    }
    return res.json({ usersExist: false });
  },
};
