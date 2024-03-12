const { Router } = require("express");

const {
    getUser,
    addWishlist,
    getWishtList,
    deleteWishlist
} = require("../controllers/user");

const router = Router();

router.get("/:id", getUser);
router.post("/wishlist/:id", addWishlist);
router.get("/wishlist/:id", getWishtList);
router.delete("/wishlist/:userid/:bookid", deleteWishlist);

module.exports = router;