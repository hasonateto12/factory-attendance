import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div>

            <nav
                style={{
                    display: "flex",
                    gap: "20px",
                    padding: "20px",
                    backgroundColor: "#1976d2"
                }}
            >
                <Link to="/" style={{color: "white"}}>
                    כניסה
                </Link>

                <Link to="/exit" style={{color: "white"}}>
                    יציאה
                </Link>

                <Link to="/reports" style={{color: "white"}}>
                    דוחות
                </Link>
            </nav>

            <div style={{padding: "20px"}}>
                <Outlet />
            </div>

        </div>
    );
}