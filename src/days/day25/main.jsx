/*  When or before u write a react code think this way
    The Layout Component
    Then the Smart and container component which fetches and uses usestate b4 returning them into the Layout Component as props for the dumb and presentational component
    Then the Dumb and Presentational Component which is just the component that use the data returned from the smart and  container component

*/
import { useState, useEffect, useRef } from "react";
// Take this messy component and split it into Container + Presentational:
function WeatherWidget({ city }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://wttr.in/${city}?format=j1`)
        .then(r => r.json())
        .then(d => { setWeather(d); setLoading(false); });
    }, [city]);

    if (loading) return <p>Loading...</p>;
    return (
        <div style={{background: '#eee', padding: 16, borderRadius: 8}}>
        <h3>🌤 {city}</h3>
        <p>Temp: {weather?.current_condition[0].temp_C}°C</p>
        <p>Wind: {weather?.current_condition[0].windspeedKmph} km/h</p>
        </div>
    );
}

//  The Split
function WeatherContainer({ city }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://wttr.in/${city}?format=j1`)
        .then(r => r.json())
        .then(d => { setWeather(d); setLoading(false); });
    }, [city]);

    return  <WeatherCard weather={weather} loading={loading} city={city}/>
}

function WeatherCard({weather, loading, city}) {
    if (loading) return <p>Loading...</p>;
    return (
        <div style={{background: '#eee', padding: 16, borderRadius: 8}}>
        <h3>🌤 {city}</h3>
        <p>Temp: {weather?.current_condition[0].temp_C}°C</p>
        <p>Wind: {weather?.current_condition[0].windspeedKmph} km/h</p>
        </div>
    );
}

// Exercise 2 — Layout Component
// Build a TwoColumnLayout component that accepts:

// left prop — left column content
// right prop — right column content
// ratio prop — "30/70", "50/50", or "40/60"

// Use it to build a "blog post" page with a sidebar and main content.

function TwoColumnLayout({header, sidebar, main, ratio }) {
    const [left, right] = ratio.split("/")

    return (
        <>
            <div className="text-center">
                {header}
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: `${left}% ${right}%`,
            }}>
                {sidebar}
                {main}
            </div>
        </>
    );
}

function Sidebar() {
    return (
        <p>this is the sidebar</p>
    )
}
function Main() {
    return (
        <p>this is the mainContent</p>
    )
}

// Exercise 3 — Controlled vs Uncontrolled
// Build a SearchBar component twice:
// As a controlled component — show a live character count below the input
// As an uncontrolled component — only log the value when the "Go" button is clicked
// Notice when each feels more natural.

function ControlledSearchBar() {
    const [query, setQuery] = useState('');

    return (
        <div>
            <input type="search" value={query} placeholder="Search...." onChange={(e)=> setQuery(e.target.value)} />
            <p>{query.length}</p>
        </div>
    )
}

function UnControlledSearchBar() {
    const inputRef = useRef(null)

    const handleSearch = () => {
        const query = inputRef.current.value
        console.log(query)
    }

    return (
        <div>
            <input type="search" ref={inputRef} defaultValue="React"  placeholder="Search...."  />
            
            <button onClick={handleSearch}>Lets Search</button>
        </div>
    )
}

// Exercise 4 — Smart/Dumb
// You have a <StarRating /> component that shows 5 stars. Build it in two versions:

// Dumb version: receives rating and onRate as props, purely renders stars
// Smart version: fetches the current rating from an API, handles saving when user clicks a star

function StarRatingDumb({ rating, onRate }) {
    const stars = [1, 2, 3, 4, 5];

    return stars.map((starNumber) => (
        <span
            key={starNumber}
            onClick={() => onRate(starNumber)}
            style={{ color: starNumber <= rating ? 'gold' : 'gray' }}
        >
        ★
        </span>
    ));
}

function StarRating({ rating, onRate }) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div>
        {stars.map((starNumber) => (
            <span
            key={starNumber}
            onClick={() => onRate(starNumber)}
            style={{
                color: starNumber <= rating ? 'gold' : 'gray',
                fontSize: '24px',
                cursor: 'pointer',
            }}
            >
            ★
            </span>
        ))}
        </div>
    );
}

function fetchRatingFromServer() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(3), 500); 
    });
}

function saveRatingToServer(newRating) {
    return new Promise((resolve) => {
        console.log('Saving rating to server:', newRating);
        setTimeout(() => resolve(newRating), 300);
    });
}

// ---------- SMART VERSION ----------
function StarRatingSmart() {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchRatingFromServer().then((serverRating) => {
        setRating(serverRating);
        setLoading(false);
        });
    }, []); 

    const handleRate = (newRating) => {
        setRating(newRating);   
        setSaving(true);
        saveRatingToServer(newRating).then(() => setSaving(false));
    };

    if (loading) return <p>Loading rating...</p>;

    return (
        <div>
            <StarRating rating={rating} onRate={handleRate} />
        {saving && <p>Saving...</p>}
        </div>
    );
}

function StarLayout() {
    const [myRating, setMyRating] = useState(0)
    return (
        <>
        <StarRatingDumb rating={myRating} onRate={(num)=> setMyRating(num)} />
        <StarRatingSmart />
        </>
    )
}

// Exercise 5 — Pattern Choice
// For each scenario below, name the best pattern and why:

// You need to show a user's profile card in 5 different places — sidebar, header, modal, list item, and full page
/* Component composition with props/variants (just a single reusable component, configured differently per use) */

// You have 10 pages that all need the same navbar + footer structure
/* Layout component pattern (a wrapper component that renders shared chrome around children) */

// You're building a live search input that shows suggestions as the user types
/* Custom Hook useDebounce */

// You need to add analytics tracking to 20 existing components without editing each one
/* HOC (wrap existing components) */

function App() {
    return (
        <div>
            <WeatherContainer city='Enugu'/>
            <TwoColumnLayout header={<h1>Blog Post Page</h1>} sidebar={ <Sidebar/> } main={ <Main/> } ratio="30/70"/>
            <ControlledSearchBar/>
            <UnControlledSearchBar/>
            <StarLayout/>
        </div>
    )
}

export default App