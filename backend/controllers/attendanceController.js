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


const registerExit = (req, res) => {

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

        const attendanceSql = `
            SELECT *
            FROM attendance_logs
            WHERE employee_id = ?
            AND exit_time IS NULL
            ORDER BY entry_time DESC
            LIMIT 1
        `;

        db.query(attendanceSql, [employee.id], (err, attendanceResults) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (attendanceResults.length === 0) {
                return res.status(400).json({
                    message: "Employee is not currently inside the factory"
                });
            }

            const attendance = attendanceResults[0];

            const updateSql = `
                UPDATE attendance_logs
                SET exit_time = NOW()
                WHERE id = ?
            `;

            db.query(updateSql, [attendance.id], (err) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                res.json({
                    message: "Exit registered successfully"
                });
            });
        });
    });
};


const getMonthlyReport = (req, res) => {

    const { idNumber } = req.params;
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({
            message: "Month and year are required"
        });
    }

    const sql = `
        SELECT 
            al.id,
            e.employee_id,
            e.full_name,
            e.department,
            al.entry_time,
            al.exit_time,
            al.attendance_date
        FROM attendance_logs al
        JOIN employees e ON al.employee_id = e.id
        WHERE e.employee_id = ?
        AND MONTH(al.attendance_date) = ?
        AND YEAR(al.attendance_date) = ?
        ORDER BY al.entry_time DESC
    `;

    db.query(sql, [idNumber, month, year], (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
};


const getAllAttendanceLogs = (req, res) => {

    const sql = `
        SELECT
            al.id,
            e.employee_id,
            e.full_name,
            e.department,
            al.entry_time,
            al.exit_time,
            al.attendance_date
        FROM attendance_logs al
        JOIN employees e
            ON al.employee_id = e.id
        ORDER BY al.entry_time DESC
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


module.exports = {
    registerEntry,
    registerExit,
    getMonthlyReport,
    getAllAttendanceLogs
};