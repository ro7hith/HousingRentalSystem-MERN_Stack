const { getPayments, pay, updatePayment, deletePayment } = require("../controllers/payments.controller");

const router = require("express").Router();

router.get("/", getPayments);
router.post("/", pay);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;