const { Router } = require("express");
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    addReview,
    deleteBook,
    getReviews,
    editReview,
    deleteReview
} = require("../controllers/book");

const router = Router();

router.get("/reviews", getReviews);
router.post("/reviews", addReview);
router.put("/reviews", editReview);
router.delete("/reviews", deleteReview);

router.get("/:id", getBook);
router.post("/", addBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);
router.get("", getBooks);

module.exports = router;