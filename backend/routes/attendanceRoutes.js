const express = require("express");

const router = express.Router();

const {
    registerEntry
} = require("../controllers/attendanceController");

router.post("/entry", registerEntry);

module.exports = router;