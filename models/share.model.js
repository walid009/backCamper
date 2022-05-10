const mongoose = require("mongoose");

const commentaireSchema = new mongoose.Schema(
  {
    idEvent: String,
    idCampeur: String,
    commentaire: String
  },
  {
    timestamps: true,
  }
);
const likeSchema = new mongoose.Schema(
  {
    idEvent: String,
    emailCampeur: String,
    like: Boolean
  },
  {
    timestamps: true,
  }
);

const shareSchema = new mongoose.Schema(
  {
    titre: String,
    description: String,
    date: String,
    Longitude: Number,
    Latitude: Number,
    emailcreateur: String,
    emailpartageur: String,
    image: String
  },
  {
    timestamps: true,
  }
);

const Share = mongoose.model("Share", shareSchema);

module.exports = { Share };