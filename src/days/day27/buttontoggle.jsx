// Exercise 2 — Button Test
// Create a Toggle component with a button that switches between showing "ON" and "OFF". Write tests for initial state and after clicking.

import { useState } from 'react'
export default function ButtonToggle() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOn(!isOn)}>
                {isOn ? 'ON' : 'OFF'}
            </button>
        </div>
    )
}