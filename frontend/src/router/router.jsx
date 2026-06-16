import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import EntryPage from "../pages/EntryPage";
import ExitPage from "../pages/ExitPage";
import ReportsPage from "../pages/ReportsPage";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <EntryPage />
            },
            {
                path: "/exit",
                element: <ExitPage />
            },
            {
                path: "/reports",
                element: <ReportsPage />
            }
        ]
    }
]);

export default router;