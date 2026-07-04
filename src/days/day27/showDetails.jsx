// Component: ShowDetails.jsx
import { useState } from 'react'

function ShowDetails() {
    const [visible, setVisible] = useState(false)

    return (
        <div>
        <button onClick={() => setVisible(true)}>Show Details</button>
        {visible && <p>Here are the secret details!</p>}
        </div>
    )
}

export default ShowDetails