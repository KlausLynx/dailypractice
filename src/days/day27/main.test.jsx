import { render, screen } from '@testing-library/react'
import Greeting from './main'

// describe = group related tests together
/* eslint-disable */

// 1. RENDER   → Put the component on a fake screen
// 2. QUERY    → Find elements on that screen
// 3. ASSERT   → Check they behave correctly

// getBy...   → throws error if not found (use when element SHOULD exist)
// queryBy... → returns null if not found (use when element SHOULD NOT exist)
// findBy...  → async, waits for element to appear

describe('Greeting component',() => {
    test('renders the name passed as a prop', () => {
        render(<Greeting name="Klaus" />)
        const heading = screen.getByRole('heading', {name: /hello, klaus/i})
        expect(heading).toBeInTheDocument()
    })

    test('renders the welcome message', () => {
        render(<Greeting name="Alice" />)
        expect(screen.getByText(/welcome to our app/i)).toBeInTheDocument()
    })
})