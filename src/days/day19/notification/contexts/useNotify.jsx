import { useContext } from 'react';
import { NotifyContext } from './NotifiyAuth';

export const useNotify = () => {
    const context = useContext(NotifyContext);

    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider');
    }
    else {
        return context;
    }
}