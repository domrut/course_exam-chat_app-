const express = require('express')
const router = express.Router();
const mainController = require("../controller/mainController")
const registerValidator = require('../validators/registerValidator')
const postValidator = require("../validators/postValidator")
const authValidator = require("../validators/authValidator");

router.post("/login", mainController.login);
router.post("/register", registerValidator, mainController.register);
router.post("/update", authValidator,  mainController.updateInfo);
router.post("/profile", authValidator, mainController.profile);
router.post("/sendNewMessage", authValidator, mainController.sendNewMessage);
router.post("/deleteConversation", authValidator, mainController.deleteConversation);
router.post("/getMessages", authValidator, mainController.getMessages);
router.post("/getChat", authValidator, mainController.getChat);
router.post("/addMessage", authValidator, mainController.addMessage);
router.post("/addLike", postValidator, mainController.addLike);

module.exports = router;