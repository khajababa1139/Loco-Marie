const {Router} = require("express");
const { register, logout, login } = require("../controllers/auth");

const router = Router();

router.post("/register", register)
router.post("/logout", logout)
router.post("/login", login)

module.exports = router;