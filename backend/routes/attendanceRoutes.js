const express = require("express");

const router = express.Router();

const {
    registerEntry,
    registerExit,
    getMonthlyReport
} = require("../controllers/attendanceController");

router.post("/entry", registerEntry);
router.post("/exit", registerExit);
router.get("/report/:idNumber", getMonthlyReport);

module.exports = router;