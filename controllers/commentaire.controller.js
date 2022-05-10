const { Share } = require("../models/share.model");
const { Commentaire } = require("../models/commentaire.model");
const mongoose = require("mongoose");

module.exports = {
    getAllCommentaireOfOneShareEvent: async (req, res) => {
        const { idEvent } = req.params
        const commentaires = await Commentaire.find({idEvent});
        res.send(commentaires);
    },
    createCommentaire: async (req, res) => {
        const { idEvent,sender, body, date } = req.body;
        console.log(req.body)
        const commentaire = new Commentaire({ idEvent, sender, body, date });
        await commentaire.save();
        res.send(commentaire);
    },
}