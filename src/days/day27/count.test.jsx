import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './count'
/* eslint-disable */

describe('Counter Component', () => {
    test('renders the initial count', () => {
        render(<Counter />)
        expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
    })

    test('increments count on button click', async () => {
        render(<Counter />)
        const user = userEvent.setup()

        await user.click(screen.getByRole('button', { name: /Increment/i }))
        expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
    })

    test('decrements count on button click', async () => {
        render(<Counter />)
        const user = userEvent.setup()

        await user.click(screen.getByRole('button', { name: /Decrement/i }))
        expect(screen.getByText(/Count: -1/i)).toBeInTheDocument()
    })

    test('resets to 0', async () => {
        const user = userEvent.setup()
        render(<Counter />)

        // Click increment twice, then reset
        await user.click(screen.getByRole('button', { name: /increment/i }))
        await user.click(screen.getByRole('button', { name: /increment/i }))
        await user.click(screen.getByRole('button', { name: /reset/i }))

        expect(screen.getByText('Count: 0')).toBeInTheDocument()
    })
})