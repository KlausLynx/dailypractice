// AuthContext: Login/logout, current user

import {useState, useMemo} from 'react';
import { AuthContext } from './useAuth';

export default function AuthComponent ({children}) {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false)

    // login function
    const login = (username) => {
        setUser(username)
        if (username) {
            setIsLogged(true);
        }   
    }

    // logout function
    const logout = () => {
        setUser(null);
        setIsLogged(false);
    }

    const value = useMemo(() => ({
        user,
        isLogged,
        login,
        logout
    }), [user, isLogged]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

