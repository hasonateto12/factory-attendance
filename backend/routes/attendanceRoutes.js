const express = require("express");

const router = express.Router();

const {
    registerEntry,
    registerExit
} = require("../controllers/attendanceController");

router.post("/entry", registerEntry);
router.post("/exit", registerExit);

module.exports = router;