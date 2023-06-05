const express = require('express')
const router = express.Router();
const inventoryController = require("../controller/inventoryController")
const registerValidator = require('../validators/registerValidator')
const postValidator = require("../validators/postValidator")

router.post("/login", inventoryController.login);
router.post("/register", registerValidator, inventoryController.register);
router.post("/addPost", postValidator, inventoryController.addPost);
router.post("/addComment", postValidator, inventoryController.addComment);
router.post("/addLike", postValidator, inventoryController.addLike);

module.exports = router;