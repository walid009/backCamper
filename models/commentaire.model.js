const mongoose = require("mongoose");

const commentaireSchema = new mongoose.Schema(
    {
        idEvent: String,
        sender: String,
        body: String,
        date: Number
    },
    {
      timestamps: true,
    }
  );

const Commentaire = mongoose.model("Commentaire", commentaireSchema);

module.exports = { Commentaire };