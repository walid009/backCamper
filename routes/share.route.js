const express = require("express");
const sharesController = require("../controllers/shares.controller");
const router = express.Router();

/**
 * @Path /shares
 */

  /**
 * @swagger
 * /shares/:
 *   get:
 *     summary: Get all shares of events
 *     tags: [Shares]
 *     description: use to get all shares of events
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.get("/", sharesController.getAllShareEvent)
   /**
 * @swagger
 * /shares/create:
 *   post:
 *     summary: Create new share
 *     tags: [Shares]
 *     description: use to create new share
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.post("/create", sharesController.createEvent)
  /**
 * @swagger
 * /shares/LikeOrUnlike/{id}/{emailcampeur}:
 *   patch:
 *     summary: Update Like and Unlike 
 *     tags: [Shares]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *       - in: path
 *         name: emailcampeur
 *         schema:
 *           type: string
 *         required: true
 *         description: The campeur email
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.patch("/LikeOrUnlike/:_id/:emailcampeur", sharesController.CheckLikeOrUnlikeAndUpdate)
   /**
 * @swagger
 * /shares/likeReturnData/{id}/{emailcampeur}:
 *   get:
 *     summary: Get is Like
 *     tags: [Shares]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *       - in: path
 *         name: emailcampeur
 *         schema:
 *           type: string
 *         required: true
 *         description: The campeur email
 *     responses: 
 *       '200':
 *         description: A successful response
 */
 router.get("/likeReturnData/:_id/:emailcampeur", sharesController.countLikeAndReturnIsliked)
 module.exports = router;