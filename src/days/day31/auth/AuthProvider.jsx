import { useEffect, useState } from "react";
import { AuthContext } from "./auth";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=> {
        try {
            return JSON.parse(localStorage.getItem("user"))
        } catch {
            return null
        }
    });

    useEffect(()=> {
        if(user) {
            return localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    const logOut = () => {
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user, setUser, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}