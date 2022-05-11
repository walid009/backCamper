const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");


/**
 * @Path /users
 */

router.put("/disapproved/:id", userController.DisapproveUser)
router.put("/approved/:id", userController.approveUser)
/**
* @swagger
* /users/organisateur:
*   get:
*     summary: Get all Organisateur User
*     tags: [Users]
*     description: use to get all Organisateur User
*     responses: 
*       '200':
*         description: A successful response
*/
router.get("/organisateur", userController.getAllOrganisateurUser)
router.get("/campeur", userController.getAllCampeurUser)
/**
* @swagger
* /users/:
*   get:
*     summary: Get all users
*     tags: [Users]
*     description: use to get all users
*     responses: 
*       '200':
*         description: A successful response
*/
router.get("/", userController.getAllUser)
/**
* @swagger
* /users/create:
*   post:
*     summary: Create user
*     tags: [Users]
*     description: Create user
*     responses: 
*       '200':
*         description: A successful response
*/
router.post("/create", userController.createUser)
/**
* @swagger
* /users/confirm/{id}:
*   get:
*     summary: update Validation Orginasateur
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: update Validation Orginasateur
*     responses: 
*       '200':
*         description: A successful response
*/
router.get("/confirm/:id", userController.updateValidationOrginasateur)
/**
* @swagger
* /users/getUser/{email}:
*   get:
*     summary: find User By Email
*     tags: [Users]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: find User By Email
*     responses: 
*       '200':
*         description: A successful response
*/
router.get("/getUser/:email", userController.authenticate, userController.findUserByEmail)
/**
* @swagger
* /users/update/{id}:
*   put:
*     summary: update user
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: update user
*     responses: 
*       '200':
*         description: A successful response
*/
router.put("/update/:id", userController.updateUser)
/**
* @swagger
* /users/login:
*   post:
*     summary: Login user
*     tags: [Users]
*     description: Login user
*     responses: 
*       '200':
*         description: A successful response
*/
router.post("/login", userController.login)
/**
* @swagger
* /users/loginGmail:
*   post:
*     summary: Login user with Gmail
*     tags: [Users]
*     description: Login user with Gmail
*     responses: 
*       '200':
*         description: A successful response
*/
router.post("/loginGmail", userController.loginGmail)
router.get("/emailexist/:email", userController.EmailExist)
router.get("/getUserWithoutAuthenticate/:email", userController.findUserByEmail)
router.put("/resetpassword/:email", userController.sendMailForgetPassword)
router.get("/checkKeyReset/:email/:resetpwd", userController.checkKeyReset)
router.put("/sendmodifiedpassword/:email/:password", userController.sendModifiedPassword)

module.exports = router;