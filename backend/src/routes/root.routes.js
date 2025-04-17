const router = require("express").Router();
const userRoutes = require("./user.routes");
const homeRoutes = require("./home.routes");
const rentRoutes = require("./rent.routes");
const paymentRoutes = require("./payments.routes");

router.use("/user", userRoutes);
router.use("/home", homeRoutes);
router.use("/rent", rentRoutes);
router.use("/payments", paymentRoutes);

module.exports = router;
