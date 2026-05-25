import React from 'react';
import { useState } from 'react';
import './learn.css';
import { Sun, Moon } from 'lucide-react';
export default function AllComponent () {
    return (
        <div className="mainContainer">
            <div>
                <SimpleToggle />
            </div>
            <div>
                <FormInputCounter />
            </div>
            <div>
                <ColorPicker />
            </div>
            <div>
                <MultiCounter />
            </div>
            <div>
                <ThemeToggle />
            </div>
        </div>
    )

}

const contStyle = {
    backgroundColor: 'white',
    maxWidth: '300px',
    width: '200px',
    padding: '1rem',
    borderRadius: '5px'
}

const SimpleToggle = () => {
    const [isOFF, setIsOff] = useState(false);

    return (
        <div style={contStyle}>
            <h2>Simple Toggle</h2>
            <div>
                <div style={{
                    width: '100%'
                }}>
                    <button onClick={() => setIsOff(false)}
                    style={{
                        backgroundColor: isOFF ? 'transparent' : 'green',
                        width: '50%'
                    }}>ON</button>
                    <button onClick={() => setIsOff(true)}
                    style={{
                        backgroundColor: isOFF ? 'red' : 'transparent',
                        width: '50%'
                    }}>OFF</button>
                </div>
                <div>
                    <p>Has a button that says <strong>'ON'</strong> or <strong>'OFF'</strong> State tracks whether it's on or off <br /> Color chanes(green when <em>on</em>, red when <em>off</em> )</p>
                </div>
            </div>
        </div>
    )
};

function ColorPicker() {
    const [selectedColor, setSelectedColor] = useState('null')
    const [colorLabel, setColorLabel] = useState('')
    
    const buttons = [
        { id: 1, label: 'Blue', bg: '#007bff', text: '#fff' },
        { id: 2, label: 'Green', bg: '#28a745', text: '#fff' },
        { id: 3, label: 'Orange', bg: '#ffc107', text: '#000' },
        { id: 4, label: 'Red', bg: '#dc3545', text: '#fff' }
    ];

    const changeColorSettings = (bg, label) => {
        setSelectedColor(bg);
        setColorLabel(label);
    }


    return (
        <div style={contStyle}>
            <h2>Color Picker</h2>
            <div>
                {buttons.map((button) => (
                    <button
                        key={button.id}
                        onClick={() => changeColorSettings(button.bg, button.label)}
                        style={{
                            backgroundColor: button.bg,
                            color: button.text,
                            border: 'none',
                            padding: '0.5rem',
                            margin: '0.25rem',
                            borderRadius: '5px'
                        }}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
            <div 
                style={{
                    width: '100%',
                    height: 'fit-content',
                    padding: '1rem',
                    marginTop: '1rem',
                    borderRadius: '5px',
                    backgroundColor: selectedColor}}>     
            </div>
            <div>
                <h4>Current Color: <span style={{color: selectedColor}}>{colorLabel}</span></h4>
                <p>Has multiple color buttons <br /> Clicking a button changes the background color of the box below to the selected color</p>
            </div>
        </div>
    );
}

const FormInputCounter = () => {
    const [inputValue, setInputValue] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setCharCount(e.target.value.length);
    };

    const handleClear = () => {
        setInputValue('');
        setCharCount(0);
    };

    return (
        <div style={contStyle}>
            <h2>Form Input Counter</h2>

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                margin: '20px auto'
                }}>
                <input
                    style={{
                    width: '100%',
                    padding: '10px 80px 10px 10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                    }}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type something..."
                />
                <button
                    onClick={handleClear}
                    style={{
                    position: 'absolute',
                    right: '5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '6px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '14px'
                    }}
                >
                    Clear
                </button>
            </div>
            <div><p>{charCount}</p></div>

            <div>
                <p>Shows a text input and a clear button <br /> Displays the number of characters typed in the input <br /> Clicking the clear button resets the input and the counter</p>
            </div>
        </div>

    )
};

const MultiCounter = () => {
    return (
        <div style={contStyle}> 
            <h2>Multi-Counter</h2>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Counter />
                <Counter />
                <Counter />
            </div>
            <div>
                <p>Displays three separate counters side by side <br /> Each counter has its own increment and decrement buttons <br /> Each counter operates independently</p>
            </div>
        </div>
    )
};
const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div style={{textAlign: 'center'}}>
            <h3>{count}</h3>
            <button onClick={() => setCount(count + 1)} style={{marginRight: '0.5rem'}}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
        </div>
    )
};

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const themeStyles = {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        padding: '1rem',
        borderRadius: '5px',
        maxWidth: '300px'
    };

    const buttonStyle = {
        padding: '0.5rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        color: isDarkMode ? '#fff' : '#000',
        display: 'flex',        
        alignItems: 'center',
        gap: '0.5rem'
    };

    return (
        <div style={themeStyles}>
            <h2>Theme Toggle</h2>
            <div style={{
                display: 'flex'
            }}>
                <button style={buttonStyle} onClick={() => setIsDarkMode(false) }>
                    <Sun />
                   light Mode
                </button>
                <button style={{
                    ...buttonStyle,
                    backgroundColor: 'black',
                    color: 'white',
                    marginLeft: '1rem'
                }} onClick={() => setIsDarkMode(true) }>
                    <Moon />
                   Dark Mode
                </button>
            </div>
            <div>
                <p>Has two buttons: 'Light Mode' and 'Dark Mode' <br /> Clicking a button switches the theme of the component accordingly</p>
            </div>
        </div>
    )
};