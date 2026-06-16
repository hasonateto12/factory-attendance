import { useState } from "react";

import api from "../api/axios";

import {
    Alert,
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

export default function ReportsPage() {

    const [employeeId, setEmployeeId] = useState("");

    const [month, setMonth] = useState("");

    const [year, setYear] = useState("");

    const [rows, setRows] = useState([]);

    const [error, setError] = useState("");

    const handleSearch = async () => {

        setError("");

        try {

            const response = await api.get(
                `/attendance/report/${employeeId}?month=${month}&year=${year}`
            );

            setRows(response.data);

        }
        catch (err) {

            setRows([]);

            setError(
                err.response?.data?.message ||
                "אירעה שגיאה"
            );
        }
    };

    const columns = [

        {
            field: "employee_id",
            headerName: "תעודת זהות",
            width: 150
        },

        {
            field: "full_name",
            headerName: "שם עובד",
            width: 180
        },

        {
            field: "department",
            headerName: "מחלקה",
            width: 150
        },

        {
            field: "entry_time",
            headerName: "שעת כניסה",
            width: 220
        },

        {
            field: "exit_time",
            headerName: "שעת יציאה",
            width: 220
        },

        {
            field: "attendance_date",
            headerName: "תאריך",
            width: 180
        }
    ];

    return (

        <Box p={3}>

            <Paper sx={{ p: 3, mb: 3 }}>

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    דוחות נוכחות
                </Typography>

                <Box
                    display="flex"
                    gap={2}
                    mb={3}
                >

                    <TextField
                        label="תעודת זהות"
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                    />

                    <TextField
                        label="חודש"
                        value={month}
                        onChange={(e) =>
                            setMonth(e.target.value)
                        }
                    />

                    <TextField
                        label="שנה"
                        value={year}
                        onChange={(e) =>
                            setYear(e.target.value)
                        }
                    />

                    <Button
                        variant="contained"
                        onClick={handleSearch}
                    >
                        חפש
                    </Button>

                </Box>

                {
                    error &&
                    (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )
                }

            </Paper>

            <Paper sx={{ height: 500 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                />

            </Paper>

        </Box>
    );
}