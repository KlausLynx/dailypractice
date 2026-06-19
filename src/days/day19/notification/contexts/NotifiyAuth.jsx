// Exercise 3: Notification System
// Create a toast notification system:

// NotificationContext: Add/remove notifications
// Auto-dismiss after 3 seconds
// Support different types (success, error, info)
// Stack multiple notifications

import { createContext, useState, useRef } from "react";

const NotifyContext = createContext();

export { NotifyContext };
export default function NotifyProvider({children}) {
    const [notifications, setNotifications] = useState([]);
    const idRef = useRef(0);

    const addNotification = (message, type) => {
        const id = idRef.current++;
        setNotifications((prev) => [...prev, {id, message, type}]);
        setTimeout(() => removeNotification(id), 3000); // Auto-dismiss after 3 seconds
    }

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id)); 
    }   

    const value = {
        notifications,
        addNotification,
        removeNotification
    }  

    return (
        <NotifyContext.Provider value={value}>
            {children}
        </NotifyContext.Provider>
    )
}