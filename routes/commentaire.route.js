const express = require("express");
const commentairesController = require("../controllers/commentaire.controller");
const router = express.Router();

/**
 * @Path /commentaires
 */

  /**
 * @swagger
 * /commentaires/{idEvent}:
 *   get:
 *     summary: Get all Commentaire by Event id 
 *     tags: [Commentaire]
 *     parameters:
 *       - in: path
 *         name: idEvent
 *         schema:
 *           type: string
 *         required: true
 *         description: id Event
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.get("/:idEvent", commentairesController.getAllCommentaireOfOneShareEvent)
   /**
 * @swagger
 * /commentaires/create:
 *   post:
 *     summary: create Commentaire
 *     tags: [Commentaire]
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.post("/create", commentairesController.createCommentaire)

 module.exports = router;