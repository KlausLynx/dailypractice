// // The component that holds the logic
// import { Children } from "react";
// import { useState } from "react";
// import { defaultRadarChartProps } from "recharts/types/chart/RadarChart";
// function MouseTracker({ render }) {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   function handleMouseMove(e) {
//     setPosition({ x: e.clientX, y: e.clientY });
//   }

//   return (
//     <div onMouseMove={handleMouseMove} style={{ height: '300px' }}>
//       {render(position)}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div>
//       // Usage — YOU control what gets rendered with the data
//       <MouseTracker render={(pos) => (
//         <p>The mouse is at {pos.x}, {pos.y}</p>
//       )} />

//       // Same logic, totally different UI — that's the power
//       {/* <MouseTracker render={(pos) => (
//         <div style={{ position: 'absolute', left: pos.x, top: pos.y }}>🐱</div>
//       )} /> */}
//     </div>
//   )
// }

import { useEffect, useState, createContext, useContext, } from "react"
import axios from 'axios'

// Composition warm-up: Build a Panel compound-style composition 
// (not Context yet, just children) with Panel.Header and Panel.Body 
// sub-parts that render inside a styled wrapper div.

const Panel = ({children}) => {
    return (
        <div className="panel text-center">
        {children}
        </div>
    )
}

const Card = ({children}) => {
    return (
        <div className="card">
        {children}
        </div>
    )
}

const Header = ({children}) => {
    return (
        <div className="panel-header">
        {children}
        </div>
    )
}

const Body = ({children}) => {
    return (
        <div className="panel-body">
        {children}
        </div>
    )
}
    
const CardBody = ({children}) => {
    return (
        <div className="card-body">
        {children}
        </div>
    )
}

Panel.Header = Header;
Panel.Body = Body;
Card.Body = CardBody;


// Render prop: Write a <DataFetcher url={...} render={(data, loading) => ...} /> component 
// that fetches JSON from a URL (use useEffect + useState from what you already know) 
// and passes data and loading into the render function.

function DataFetcher({ render, url }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        axios.get(url)
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
        .catch(error => {
            setError(error.message)
            setLoading(false);
        })
    },[url])

    return render(data, loading, error);
}

// Spot the HOC: Here's a HOC — rewrite it as a custom hook instead:

// eslint-disable-next-line
function withWindowWidth(WrappedComponent) {
    return function (props) {
        const [width, setWidth] = useState(window.innerWidth);
        useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
        }, []);
        return <WrappedComponent {...props} width={width} />;
    };
}
// The withWindowWidth is the HOC

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
        }, []);

    return width
}

// Compound components: Extend the Tabs example above 
// — add an Tabs.Badge sub-component that shows a count next to a Tab's label, 
// e.g. <Tabs.Tab id="inbox">Inbox <Tabs.Badge count={5} /></Tabs.Tab>.
const TabsContext = createContext(null);

function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}

function TabList({ children }) {
    return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === id;

    return (
        <button
        className={isActive ? 'tab tab-active' : 'tab'}
        onClick={() => setActiveTab(id)}
        >
        {children}
        </button>
    );
}

function TabBadge({count }) {
    return <span>{count}</span>
}

function TabPanel({ id, children }) {
    const { activeTab } = useContext(TabsContext);
    if (activeTab !== id) return null;
    return <div className="tab-panel">{children}</div>;
}

// Attach as properties for a clean API
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
Tabs.Badge = TabBadge

// Conceptual: In your own words (2-3 sentences), explain why a custom hook avoids "wrapper hell" while a HOC doesn't.

// HOC = wraps around your component (adds layers)
// HOC = creates deeply nested nodes 
// Hook = plugs into your component (no layers)
// Hook = this just shows one node
// HOC = This returns a whole new component
// Hook = this returns just values

const App = () => {
    const width = useWindowWidth()
    return (
        <div>
        <Panel>
            <Panel.Header>
            <h1>Greetings Panel of Judges</h1>
            <p> I take up {width}px of width</p>
            </Panel.Header>
            <Panel.Body>
            <div>
                <p>After so much considerations i have decided to b a good boy</p>
            </div>
            </Panel.Body>
        </Panel>
        <Card>
            <Card.Body>
            <p>I just decided to try this</p>
            </Card.Body>
        </Card>
        <Tabs defaultTab="profile">
            <Tabs.List>
                <Tabs.Tab id="profile">Profile</Tabs.Tab>
                <Tabs.Tab id="settings">Settings</Tabs.Tab>
                <Tabs.Tab id="inbox">
                    Inbox <Tabs.Badge count={5} />
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel id="profile">Profile content here</Tabs.Panel>
            <Tabs.Panel id="settings">Settings content here</Tabs.Panel>
        </Tabs>
        <DataFetcher url='https://jsonplaceholder.typicode.com/users/' render={(data, loading, error) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;
            return (
                <div>
                    {data.map(({id, name}) => (
                        <p key={id}>{name}</p>
                    ))}
                </div>
            );
        }}/>

        </div>
        
    )
}

export default App