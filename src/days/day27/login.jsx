// LoginForm.jsx
import { useState } from 'react'

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
        </form>
    )
}

export default LoginForm