const { Router } = require("express");

const {
    getDelivery,
    confirmDelivery,
    declineDelivery,
    acceptDelivery

} = require("../controllers/delivery");

const router = Router();

router.get("/:id", getDelivery);
router.put("/decline/", declineDelivery);
router.put("/delivered/", confirmDelivery);
router.put("/accept/", acceptDelivery);

module.exports = router;