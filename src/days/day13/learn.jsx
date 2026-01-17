import React from "react";
import { useForm } from "react-hook-form";

export default function MainComponent () {
    return (
        <div>
            <div className="mb-4 flex flex-col items-center justify-center text-center ">
                <h1 className="text-orange-600">Welcome to Day 13 Learning Component!</h1>
                <p className="text-gray-600">This is where we explore new React concepts.</p>
            </div>

            <div style={{marginTop: '20px'}} className="grid grid-cols-3" >
                <WindowSizeTracker />
                <AutoSaveForm />
                <MultipleEffects />
                <DataFetcher />
            </div>
        </div>
    );
};

// Exercise 1: Window Size Tracker

// Create a component that displays the window width and height
// Use useEffect with empty dependency to set up a resize listener
// Include cleanup to remove the listener

const WindowSizeTracker = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
         window.addEventListener('resize', handleResize);
        return () => {
           window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div>
            <h2>Window Size Tracker</h2>
            <p>Width: {windowSize.width}px</p>
            <p>Height: {windowSize.height}px</p>
        </div>
    );
};

// Exercise 2: Form Auto-Save

// Create a form with inputs email and password, confirmPassword and checkbox "Remember Me"
// Use useEffect to implement auto-save functionality
// After 2 seconds of no changes, log "Saving..." to console
// Cancel the save if user types again (hint: return cleanup function from useEffect)

const AutoSaveForm = () => {
    const {register, handleSubmit, formState: {errors, isValid, isDirty}, trigger, reset, watch} = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
        }
    });

    const formValues = watch();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const rememberMe = watch("rememberMe");
    const onsubmit = (data) => {
        console.log("Form Submitted", data);
        reset();
    }

    React.useEffect(() => {
        if (password && confirmPassword) {
            trigger("confirmPassword");
        }
    }, [password, trigger, confirmPassword]);

    React.useEffect(() => {
        if (!isDirty) return;
        const timer = setTimeout(() => {
            console.log("Saving...", formValues);
        }, 2000);
        return () => clearTimeout(timer);
    }, [formValues, isDirty]);

    return (
        <div>
            <h2>Auto Save Form</h2>
            <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register("email",
                        {required: "Email is required", pattern: {value: /^\S+@\S+$/i, message: "Invalid email address"}})}
                        className="input-field"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" {...register("password",
                        {required: "Password is required", minLength: {value: 6, message: "Password must be at least 6 characters"}})}
                        className="input-field"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword">ConfirmPassword</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword",{
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                    })}
                    className="input-field" 
                    placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                </div>

                <div>
                    <label htmlFor="rememberMe">
                        <input type="checkbox" id="rememberMe" {...register("rememberMe",{
                            required: "You must agree to remember me"
                        })} />
                       {' '} Remember Me
                    </label>
                </div>

                <button type="submit" 
                    className={`p-2 rounded-md transition-colors ${
                    !isDirty || !isValid 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-900 hover:bg-amber-900 text-yellow-950"
                    }`}
                    disabled={!isDirty || !isValid || !rememberMe}>
                        Submit
                </button>
            </form>
        </div>
    )
};

// Exercise 3: Multiple Effects

// Create a component with a counter and a name input
// Effect 1: Log when counter changes
// Effect 2: Log when name changes
// Effect 3: Update page title with name (runs only once)

const MultipleEffects = () => {
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        console.log(`Counter changed: ${count}`);

    }, [count]);

    React.useEffect(() => {
        console.log(`Name changed: ${name}`);
    }, [name]);

    React.useEffect(() => {
        document.title = `Welcome, ${name || 'Guest'}`;
    }, [name]);
    return (
        <div>
            <h2>Multiple Effects</h2>
            <div>
                <p>Counter: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
            <div>
                <p>Name: {name}</p>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        </div>
    )
};

// Exercise 4: Fetch Data (Preview)

// Create a component with a button
// When clicked, log "Fetching data..." to console
// After 1 second, log "Data loaded!"
// Use useEffect and cleanup

const DataFetcher = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const fetchData = () => {
        setLoading(true);
    }
    
    React.useEffect(() => {
        let timer;
        if (loading) {
            console.log("Fetching data...");
            timer = setTimeout(() => {
                setData("Data loaded!");
                setLoading(false);
                console.log("Data loaded!");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [loading])
    return (
        <div>
            <h2>Data Fetcher</h2>
            <button onClick={fetchData} disabled={loading} className="p-2 bg-green-600 text-white rounded-md">
                {loading ? "Loading..." : "Fetch Data"}
            </button>
            {data && <p>{data}</p>}
        </div>
    )
};