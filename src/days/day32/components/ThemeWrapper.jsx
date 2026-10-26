import { useSelector } from "react-redux";

export const ThemeWrapper = ({ children }) => {
    const mode = useSelector((state) => state.theme.mode);
    
    return (
        <div className={mode === "dark" ? "dark" : ""}>
            <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 min-h-screen transition-colors duration-300">
                {children}
            </div>
        </div>
    );
};

// “Theme is a small value that rarely changes, so Context is a better fit. 
// Redux would work but adds extra setup for little benefit. 
// Redux suits bigger state like a cart, where many actions change it often.”