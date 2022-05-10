const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role: String,
    telephone: String,
    valid: Boolean,
    approved: Boolean
  },
  {
    timestamps: true,
  }
);

const eventSchema = new mongoose.Schema(
  {
    titre: String,
    description: String,
    date: String,
    Longitude: Number,
    Latitude: Number,
    participants: [userSchema],
    emailcreateur: String,
    phonecreateur: String,
    image: String,
    price: String
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };