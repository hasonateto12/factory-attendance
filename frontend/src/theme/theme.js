import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    direction: "rtl",

    palette: {

        primary: {
            main: "#1565c0"
        },

        secondary: {
            main: "#2e7d32"
        },

        background: {
            default: "#f4f6f8"
        }
    },

    typography: {

        fontFamily: "Rubik, Arial",

        h4: {
            fontWeight: 700
        }
    }
});

export default theme;