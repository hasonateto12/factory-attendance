const db = require("../config/db");

const getAllEmployees = (req, res) => {

    const sql = `
        SELECT *
        FROM employees
        ORDER BY full_name
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
};


const getEmployeeByIdNumber = (req, res) => {

    const { idNumber } = req.params;

    const sql = `
        SELECT *
        FROM employees
        WHERE employee_id = ?
    `;

    db.query(sql, [idNumber], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json(results[0]);
    });
};

module.exports = {
    getAllEmployees,
    getEmployeeByIdNumber
};