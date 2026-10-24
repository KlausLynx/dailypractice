import { useAuth } from "./auth"
import { Navigate, Outlet, useLocation } from "react-router"

export const ProtectedRoute = () => {
    const { user } = useAuth()
    const location = useLocation()
    
    if (!user) {
        return <Navigate to="/login" replace state={{from: location}}/>
    }
    else {
        return <Outlet/>
    }
}

export const AdminProtectedRoute = () => {
    const { user } = useAuth()
    const location = useLocation()

    if(!user?.admin) {
        return <Navigate to="/403" replace state={{from: location}}/>
    }
    else {
        return <Outlet/>
    }
}