const express = require("express");

const router = express.Router();

const {
    registerEntry,
    registerExit,
    getMonthlyReport,
    getAllAttendanceLogs
} = require("../controllers/attendanceController");

router.post("/entry", registerEntry);
router.post("/exit", registerExit);
router.get("/report/:idNumber", getMonthlyReport);
router.get("/", getAllAttendanceLogs);

module.exports = router;