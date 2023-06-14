const express = require('express')
const router = express.Router();
const mainController = require("../controller/mainController")
const registerValidator = require('../validators/registerValidator')
const addUserValidation = require("../validators/addUserValidation")
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
router.post("/addLike", authValidator, mainController.addLike);
router.post("/addUser", authValidator, addUserValidation, mainController.addUser);

module.exports = router;