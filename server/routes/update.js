const express = require("express");
const router = express.Router();

const update = require("../controllers/update");
const verifyToken = require("../middleware/verifyToken");

router.post("/score", verifyToken, update.handleScore);
router.post("/level", verifyToken, update.handleLevel);

module.exports = router;
