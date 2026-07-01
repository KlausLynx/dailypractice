// 1. THE ERROR BOUNDARY 
// A class component is required here — React only lets classes catch
// render errors from their children. There's no hook for this (yet).
    // React calls this static getDerivedStateFromError AUTOMATICALLY the instant a child throws during render.
    // "Given this error, what should our new state be?" -> flip hasError to true.
    // This must be a pure function: no side effects, just return new state.
    // React calls this componentDidCatch(error, errorInfo)  AFTER getDerivedStateFromError, also automatically.
    // This is where side effects go: logging, reporting to Sentry, etc.
    // After all those u render() {either the fallback or the children, depending on hasError.}

import { Component, useEffect, useState } from 'react';
import axios from 'axios'
import { ErrorBoundary as LibraryErrorBoundary } from 'react-error-boundary';

// Exercise 1 — Basic Error Boundary
// Create an ErrorBoundary class component. 
// Then create a BuggyComponent that throws when a prop shouldCrash is true. 
// Wrap it and verify the fallback UI shows instead of crashing.

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo.componentStack);
    } 

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
// Buggy Component
function BuggyComponent({ shouldCrash }) {
    if (shouldCrash) {
        throw new Error('BuggyComponent crashed because shouldCrash was true');
    }
    return (
        <div style={{
        padding: '16px',
        background: 'var(--bg-success, #EAF3DE)',
        color: 'var(--text-success, #27500A)',
        borderRadius: '8px',
        fontSize: '14px',
        }}>
        ✓ BuggyComponent rendered fine — shouldCrash is false
        </div>
    );
}

// Presentational
function ResetButton({shouldCrash, handleToggle}) {
    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
            <h3 style={{ marginBottom: '4px' }}>ErrorBoundary demo</h3>
            <p style={{ fontSize: '13px', color: '#666', marginTop: 0 }}>
                shouldCrash is currently: <b>{String(shouldCrash)}</b>
            </p>

            <button
                onClick={handleToggle}
                style={{
                padding: '8px 16px',
                marginBottom: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                background: shouldCrash ? '#E24B4A' : '#f5f5f5',
                color: shouldCrash ? 'white' : 'black',
                }}
            >
                {shouldCrash ? 'Reset (fix the bug)' : 'Trigger the crash'}
            </button>
        </div>
    );
}

// Container 
function Demo() {
    const [shouldCrash, setShouldCrash] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const handleToggle = () => {
        setShouldCrash((prev) => !prev);
        setResetKey((k) => k + 1);
    };

    return (
        <>
            <ResetButton shouldCrash={shouldCrash} handleToggle={handleToggle} />
            <ErrorBoundary
                key={resetKey}
                fallback={
                    <div style={{
                        padding: '16px',
                        background: '#FCEBEB',
                        color: '#791F1F',
                        borderRadius: '8px',
                        fontSize: '14px',
                    }}>
                        <b>Fallback UI:</b> Something went wrong loading this widget.
                        <div style={{ fontSize: '12px', marginTop: '6px', opacity: 0.8 }}>
                            (The rest of the page is still alive — try the button above.)
                        </div>
                    </div>
                    }
                >
            <BuggyComponent shouldCrash={shouldCrash} />
            </ErrorBoundary>
        </>
    )
}

// Exercise 2 — Async Error Handling
// Build a PostFetcher component that:
// Fetches from https://jsonplaceholder.typicode.com/posts/1
// Shows a loading state
// Shows the post title on success
// Shows a user-friendly error message if it fails (test by using a bad URL)
// Has a "Retry" button

const PostFetcher =  ({url}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(url);
            console.log(res.data)
            setData(res.data);
        } catch (err) {
            console.error('Error fetching post:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]); 

    const handleRetry = () => {
        return fetchPost()
    }
    return (
        <>
            <BlogPostFetcher data={data} error={error} loading={loading} retryButton={handleRetry} />
        </>
    )
}

function RetryButton({ shouldCrash, onRetry}) {
    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
            <p style={{ fontSize: '13px', color: '#666', marginTop: 0 }}>
                The Current Crash is currently: <b>{String(shouldCrash)}</b>
            </p>

            <button
                onClick={onRetry}
                style={{
                padding: '8px 16px',
                marginBottom: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                background: shouldCrash ? '#E24B4A' : '#f5f5f5',
                color: shouldCrash ? 'white' : 'black',
                }}
            >
                {shouldCrash ? 'Retry' : 'Trigger the crash'}
            </button>
        </div>
    );
}


function BlogPostFetcher({data, error, loading, retryButton}) {
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return (
            <div>
                <p>Something went wrong: {error.message}</p>
                <RetryButton shouldCrash={error} onRetry={retryButton}/>
            </div>
        )
    }   

    if (data) {
        return (
            <div>
                <h2>{data.title}</h2>
                <p>{data.body}</p>
            </div>
        )
    }
}

// Exercise 3 — Full State Machine
// Build a component with 4 clear states: loading, error, empty, and success. 
// Use a button to trigger a fake API call 
// (use setTimeout to simulate delay, randomly throw an error 50% of the time).

function FakeApiCall()  {
    const [state, setState] = useState('empty');
    const [data, setData] = useState(null);

    const handleFakeFetch = async () => {
        return new Promise((resolve, reject) => {
            setState('loading');
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    reject(new Error('Random API error occurred'));
                } else {
                    resolve({ message: 'Fake API call succeeded!' });
                }
            }, 1000);
        })
        .then((result) => {
            setData(result);
            setState('success');
        })
        .catch((err) => {
            console.error(err);
            setState('error');
        });
    }

    return <FakeApiComponent state={state} data={data} handleFakeFetch={handleFakeFetch} />

    
}

function FakeApiButton({onhandle, label}) {
    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
            <button
                onClick={onhandle}
                style={{
                padding: '8px 16px',
                marginBottom: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                background: '#E24B4A',
                color: 'white' 
                }}
            >
                {label}
            </button>
        </div>
    );
}

function FakeApiComponent({ state, data, handleFakeFetch }) {
    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
            <h3>Fake API Call Demo</h3>
            {state === 'loading' && <p>Loading...</p>}
            {state === 'error' && (
                <div>
                    <p style={{ color: 'red' }}>Error: Something went wrong!</p>
                    <FakeApiButton onhandle={handleFakeFetch} label='Retry'/>
                </div>      
        )}  
            {state === 'empty' && (
                <div>
                    <p>No data yet. Click the button to fetch.</p>
                    <FakeApiButton onhandle={handleFakeFetch} label='Fetch Data' />
                </div>
            )}
            {state === 'success' && (
                <div>
                    <p style={{ color: 'green' }}>{data.message}</p>
                    <FakeApiButton onhandle={handleFakeFetch} label='Fetch Again' />
                </div>
            )}
        </div>
    )
}


// Exercise 4 — Graceful Degradation
// You receive this unpredictable user object (sometimes fields are missing):
// jsconst user = { name: "Alice" }; // no email, no address
// Build a UserProfile component that never crashes regardless of what's missing, using optional chaining and nullish coalescing.

const UserProfile = ({ user }) => {
    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
            <h3>User Profile</h3>
            <p>Name: {user?.name ?? 'N/A'}</p>
            <p>Email: {user?.email ?? 'N/A'}</p>
            <p>Address: {user?.address ?? 'N/A'}</p>
        </div>
    );
}

// Exercise 5 — Install & Use react-error-boundary
// Install react-error-boundary, 
// create a custom fallback component, 
// and wrap a component that might fail. 
// Add an onError callback that logs to the console.

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" style={{ padding: '16px', background: '#FCEBEB', color: '#791F1F', borderRadius: '8px', fontSize: '14px' }}>
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={resetErrorBoundary} style={{ padding: '8px 16px', marginTop: '8px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer', background: '#E24B4A', color: 'white' }}>
                Try again
            </button>
        </div>
    );
}

function ErrorLayout() {
    const [shouldCrash, setShouldCrash] = useState(true); 

    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px' }}>
            <h3>Error Boundary Demo</h3>
            <LibraryErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={(error, info) => {
                    console.log('Logged error:', error.message);
                    console.log('Component stack:', info.componentStack);
                }}
                onReset={() => setShouldCrash(false)}  
            >
                <BuggyComponent shouldCrash={shouldCrash} />  
            </LibraryErrorBoundary>
        </div>
    );
}



// Layout
export default function Day26 () {
    return (
        <>
            <Demo/>
            <PostFetcher url="https://jsonplaceholder.typicode.com/posts/1" />
            <FakeApiCall />
            <UserProfile user={{ name: "Alice" }} />
            <ErrorLayout />
        </>
    )
}
