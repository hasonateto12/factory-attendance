import { useState } from "react";

import api from "../api/axios";

import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Alert
} from "@mui/material";

export default function EntryPage() {

    const [employeeId, setEmployeeId] = useState("");

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const handleEntry = async () => {

        setSuccess("");
        setError("");

        try {

            const response = await api.post(
                "/attendance/entry",
                {
                    employee_id: employeeId
                }
            );

            setSuccess(response.data.message);

            setEmployeeId("");

        }
        catch (err) {

            setError(
                err.response?.data?.message ||
                "אירעה שגיאה"
            );
        }
    };

    return (

        <Box
            display="flex"
            justifyContent="center"
            mt={5}
        >

            <Paper
                elevation={3}
                sx={{
                    width: 500,
                    padding: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    כניסה למפעל
                </Typography>

                <TextField
                    fullWidth
                    label="תעודת זהות"
                    value={employeeId}
                    onChange={(e) =>
                        setEmployeeId(e.target.value)
                    }
                    sx={{ mb: 3 }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleEntry}
                >
                    כניסה למפעל
                </Button>

                {
                    success &&
                    (
                        <Alert
                            severity="success"
                            sx={{ mt: 3 }}
                        >
                            {success}
                        </Alert>
                    )
                }

                {
                    error &&
                    (
                        <Alert
                            severity="error"
                            sx={{ mt: 3 }}
                        >
                            {error}
                        </Alert>
                    )
                }

            </Paper>

        </Box>
    );
}