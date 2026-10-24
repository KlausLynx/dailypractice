import { NavLink, useNavigate  } from "react-router";
import { useAuth } from "../auth/auth";
import { LogOut } from 'lucide-react'; 

export function Nav() {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
        navigate("/login")
    }
    
    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive ? "bg-amber-950 text-amber-400 shadow-sm"
        : "text-amber-950 hover:bg-amber-500/30"
    }`

    return (
        <nav className="bg-amber-400 px-6 py-4 flex items-center justify-between shadow-sm font-sans">
            {/* Optional Logo/Brand Section */}
            <div className="text-lg font-bold text-amber-950 tracking-wide">
                MyApp
            </div>

            {/* Navigation Links */}
            <div className="flex gap-2 items-center">
                <NavLink 
                    to="/"
                    className={linkClass}
                >
                    Home
                </NavLink>

                <NavLink 
                    to="/dashboard"
                    className={linkClass}
                >
                    Dashboard
                </NavLink>

                <NavLink 
                    to="/settings"
                    className={linkClass}
                >
                    Settings
                </NavLink>

                <NavLink 
                    to="/products"
                    className={linkClass}
                >
                    Products
                </NavLink>

                <NavLink 
                    to="/about"
                    className={linkClass}
                >
                    About
                </NavLink>

                <button 
                    onClick={handleLogOut} 
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-amber-950 hover:bg-red-500/20 hover:text-red-900 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-950 cursor-pointer"
                >
                    <LogOut className="h-4 w-4 opacity-80" />
                    Logout
                </button>
            </div>
        </nav>
    );
}
