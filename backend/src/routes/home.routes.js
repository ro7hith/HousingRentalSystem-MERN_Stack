const { getHomes, addHome, updateHome, deleteHome } = require("../controllers/home.controller");


const router = require("express").Router();

router.get("/", getHomes);
router.post("/", addHome);
router.put("/:id", updateHome);
router.delete("/:id", deleteHome);

module.exports = router;