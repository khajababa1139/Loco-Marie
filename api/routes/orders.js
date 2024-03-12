const { Router } = require("express");

const {
    getOrder,
    addOrder,
    deleteOrder,
    confirmOrder
} = require("../controllers/order");

const router = Router();

router.get("/:id", getOrder);
router.post("/:id", addOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", confirmOrder);

module.exports = router;