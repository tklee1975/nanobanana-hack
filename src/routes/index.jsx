
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import { useRoutes } from "react-router-dom";
import TestRoutes from "./TestRoutes";

export default function Router() {
    //  const routes = useRoutes(
    const routes = useRoutes([
        // (process.env.NODE_ENV === 'production') ? {} : TestRoutes,
        TestRoutes,
        {
            path: "/",
            element: <Home />
        }, {
            path: "/home",
            element: <Home />
        }
    ]);

    return routes;
}
