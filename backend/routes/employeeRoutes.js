const express = require("express");

const router = express.Router();

const {
    getAllEmployees,
    getEmployeeByIdNumber
} = require("../controllers/employeeController");

router.get("/", getAllEmployees);
router.get("/:idNumber", getEmployeeByIdNumber);
module.exports = router;