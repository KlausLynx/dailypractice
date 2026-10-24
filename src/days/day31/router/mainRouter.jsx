import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { RootLayout } from "../layout/RootLayout"
import { Home} from "../pages/Home";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AdminProtectedRoute } from "../auth/ProtectedRoute";
import { AuthProvider } from "../auth/AuthProvider";
import { loader } from "../auth/requiredAuth";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        HydrateFallback: () => <p>Loading....</p>,
        children: [
            { index: true, Component: Home },
            {   
                Component: ProtectedRoute,
                children: [
                    { path: "dashboard", lazy: () => import("../pages/Dashboard") },
                ]
            },
            {
                Component: AdminProtectedRoute,
                children: [
                    { path: "admin", lazy: () => import("../pages/Admin") },
                ]
            },
            { path: "about", lazy: () => import("../pages/About") },
            { path: "settings", loader: loader,  lazy: () => import("../pages/Settings")},
            { path: "products", loader: loader,  lazy: () => import("../pages/Products")},
            { path: "products/:id", loader: loader,  lazy: () => import("../pages/ProductDetail")},
            { path: "login", lazy: () => import("../pages/Login") },
            { path: "*", lazy: () => import("../pages/NotFound") },
            { path: "/403", lazy: () => import("../pages/Forbidden") },
        ]
    },
])

export default function MainComponent() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        
    )
}