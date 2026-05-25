import { useState, createContext } from "react";

const ThemeContext = createContext();

export { ThemeContext };

export default function ThemeProvider ({children})  {
    const [theme, setTheme] = useState('light');

    const style = {
        dark: {
            backgroundColor: '#333',
            color: '#fff'
        },
        light: {
            backgroundColor: '#fff',
            color: '#333'
        }
    }

    const toggleFunction = () => {
        console.log('Toggling theme');
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    const value = {
        theme,
        style: style[theme],
        toggleTheme: toggleFunction
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}