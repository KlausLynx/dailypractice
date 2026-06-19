// Exercise 3: Notification System
// Create a toast notification system:

// NotificationContext: Add/remove notifications
// Auto-dismiss after 3 seconds
// Support different types (success, error, info)
// Stack multiple notifications

import { useNotify } from "./contexts";
import { NotifyProvider } from "./contexts";

const notificationMessagesAndTypes = [
    { message: 'Operation successful!', type: 'success' },
    { message: 'An error occurred.', type: 'error' },
    { message: 'This is an info message.', type: 'info' },
];
const Notify = () => {
    const { notifications, addNotification, removeNotification } = useNotify();
    return (
        <div>
            <h2>Notification System</h2>
            <div>
                {
                notificationMessagesAndTypes.map((notif, index) => (
                    <button
                        key={index}
                        onClick={() => addNotification(notif.message, notif.type)}
                        style={{ margin: '5px', padding: '10px', borderRadius: '5px' }}
                    >
                        {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                    </button>
                ))
                };
            </div>
            <div>
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        style={{
                            margin: '10px 0',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor:
                                notif.type === 'success' ? 'lightgreen' : notif.type === 'error' ? 'lightcoral' : 'lightblue',
                            color: 'black',
                        }}
                    >
                        {notif.message}
                        <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => removeNotification(notif.id)}>X</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function NotifyContent() {
    return (
        <NotifyProvider>
            <Notify />
        </NotifyProvider>
    )
}