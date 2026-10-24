import { useState } from "react";
import { useAuth } from "../auth/auth"
import { useLocation, Navigate, useSearchParams} from "react-router";
export const Component = () => {
    const [ name, setName] = useState('')
    const { user, setUser} = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");
    const safeRedirect = redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : null
    const from = safeRedirect || location.state?.from?.pathname || "/dashboard";

    if (user?.name) {
        return <Navigate to={from} replace />
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const admin = name.toLowerCase() === "john" 
        setUser({name, admin})
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <form 
            onSubmit={handleLogin} 
            className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Log In</h1>
            
            <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</label>
            <input 
                type="text"
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
            Sign In
            </button>
        </form>
        </div>
    );
}