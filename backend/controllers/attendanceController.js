const db = require("../config/db");

const registerEntry = (req, res) => {

    const { employee_id } = req.body;

    if (!employee_id) {
        return res.status(400).json({
            message: "Employee ID is required"
        });
    }

    const employeeSql = `
        SELECT *
        FROM employees
        WHERE employee_id = ?
    `;

    db.query(employeeSql, [employee_id], (err, employeeResults) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (employeeResults.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const employee = employeeResults[0];

        const checkSql = `
            SELECT *
            FROM attendance_logs
            WHERE employee_id = ?
            AND exit_time IS NULL
        `;

        db.query(checkSql, [employee.id], (err, attendanceResults) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (attendanceResults.length > 0) {
                return res.status(400).json({
                    message: "Employee is already inside the factory"
                });
            }

            const insertSql = `
                INSERT INTO attendance_logs
                (
                    employee_id,
                    entry_time,
                    attendance_date
                )
                VALUES
                (
                    ?,
                    NOW(),
                    CURDATE()
                )
            `;

            db.query(insertSql, [employee.id], (err, result) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                res.status(201).json({
                    message: "Entry registered successfully",
                    attendanceId: result.insertId
                });
            });
        });
    });
};

module.exports = {
    registerEntry
};