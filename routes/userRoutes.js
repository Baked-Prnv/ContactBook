const express = require("express")
const { registerUSer, loginUser, currentUser, homePage } = require("../controllers/usercontroller");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

router.get('/', homePage);
router.post("/register", registerUSer);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router