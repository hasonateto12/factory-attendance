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

module.exports = {
    getAllEmployees
};