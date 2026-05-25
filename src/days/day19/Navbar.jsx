import { useAuth, useLang, useTheme } from "./contexts";
export default function Navbar() {
    const { user, login, logout } = useAuth();
    const { translation, toggleLang } = useLang();
    const { style, toggleTheme  } = useTheme();
    return (
        <div style={style} className="p-4 flex gap-4 items-center">
            <button className="bg-amber-600 p-2 rounded-2xl" onClick={toggleTheme}>Toggle Theme</button>
            {!user && (
                <button onClick={() => login("Klaus")}>Login</button>
            )}
            {user && (
                <div>
                    <span>{translation.welcome}, {user}!</span>
                    <button onClick={logout}>Logout</button>
                    <button onClick={toggleLang}>{translation.toggle}</button>
                </div>
            )}
        </div>
    )
}