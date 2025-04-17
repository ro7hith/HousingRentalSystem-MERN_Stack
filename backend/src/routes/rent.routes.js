const { 
    getOnRents, createRent, updateRent, deleteRent, getRents, 
} = require("../controllers/rent.controller");

const router = require("express").Router();

router.get("/", getRents);
router.get("/:homeId", getOnRents);
router.post("/", createRent);
router.put("/:id", updateRent);
router.delete("/:id", deleteRent);

module.exports = router;
