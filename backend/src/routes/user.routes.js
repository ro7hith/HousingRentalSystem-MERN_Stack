const { registerUser, getUser, updateUser, deleteUser, login, getMyRents } = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/register", registerUser);
router.get("/homes", getMyRents);
router.post("/login", login);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;