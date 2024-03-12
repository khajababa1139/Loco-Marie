const { Router } = require("express");

const {
    getSearch
} = require("../controllers/search")

const router = Router();

router.get("/", getSearch);

module.exports = router;