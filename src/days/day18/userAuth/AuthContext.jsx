// Exercise 2: User Authentication Context
// Build an authentication system:

// Create AuthContext
// Store: user (null when logged out) and isLoggedIn boolean
// Functions: login(username) and logout()
// Create a Login component and a Profile component
// Show different UI based on auth state

import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userName) => {
        if(userName) {
            setUser(userName)
            setIsLoggedIn(true)
        }
    }

    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            login,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;