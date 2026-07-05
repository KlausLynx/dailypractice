// src/components/ProductTabs.jsx
import { useState, createContext, useContext} from 'react';

const TabsContext = createContext(null);

function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div>{children}</div>
        </TabsContext.Provider>
    );
}

function TabList({ children }) {
    return (
        <div style={{
        display: 'flex',
        borderBottom: '2px solid #e5e7eb',
        marginBottom: '20px'
        }}>
        {children}
        </div>
    );
}

function Tab({ id, children }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === id;

    return (
        <button
        onClick={() => setActiveTab(id)}
        style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: isActive ? '700' : '400',
            color: isActive ? '#4f46e5' : '#6b7280',
            borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
            marginBottom: '-2px',
            fontSize: '15px'
        }}
        >
        {children}
        </button>
    );
}

function TabPanel({ id, children }) {
    const { activeTab } = useContext(TabsContext);
    if (activeTab !== id) return null;
    return <div>{children}</div>;
}

// Attach sub-components
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;