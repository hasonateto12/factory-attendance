import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from "@mui/material";

import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {

    return (

        <>

            <AppBar position="static">

                <Toolbar>

                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                    >
                        מערכת נוכחות עובדים
                    </Typography>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        כניסה
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/exit"
                    >
                        יציאה
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/reports"
                    >
                        דוחות
                    </Button>

                </Toolbar>

            </AppBar>

            <Box p={3}>
                <Outlet />
            </Box>

        </>
    );
}