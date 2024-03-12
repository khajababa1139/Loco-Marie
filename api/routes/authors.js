const { Router } = require("express");

const {
    getAuthors
} = require("../controllers/author");

const router = Router();

router.get("", getAuthors);

module.exports = router;