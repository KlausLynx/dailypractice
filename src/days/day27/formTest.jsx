// Exercise 3 — Form Test
// Create a simple search form with one input and a submit button. Test that submitting calls an onSearch prop with the input value.

import { useState } from 'react'
export default function SearchForm({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                placeholder="Enter search term..."
                aria-label="Search query"
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}