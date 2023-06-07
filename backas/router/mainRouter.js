const express = require('express')
const router = express.Router();
const mainController = require("../controller/mainController")
const registerValidator = require('../validators/registerValidator')
const postValidator = require("../validators/postValidator")
const authValidator = require("../validators/authValidator");

router.post("/login", mainController.login);
router.post("/register", registerValidator, mainController.register);
router.post("/addPost", mainController.addPost);
router.post("/profile", authValidator, mainController.profile);
router.post("/addComment", postValidator, mainController.addComment);
router.post("/addLike", postValidator, mainController.addLike);

module.exports = router;