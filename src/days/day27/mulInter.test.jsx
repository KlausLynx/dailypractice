import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MulInter from './mulInter'

/* eslint-disable */

describe('MulInter component', () => {
    test('renders initial state correctly', () => {
        render(<MulInter />)
        const quantityElement = screen.getByText(/Quantity: 1/i)
        expect(quantityElement).toBeInTheDocument()
        const incremetButton = screen.getByRole('button', { name: /Increment/i })
        expect(incremetButton).toBeInTheDocument()
        const decrementButton = screen.getByRole('button', { name: /Decrement/i })
        expect(decrementButton).toBeInTheDocument()
    })

    test('incrememts', async () => {
        const user = userEvent.setup()
        render(<MulInter />)
        const incrementButton = screen.getByRole('button', { name: /Increment/i })
        await user.click(incrementButton)
        const quantityElement = screen.getByText(/Quantity: 2/i)
        expect(quantityElement).toBeInTheDocument()
    })

    test('decrements', async () => {
        const user = userEvent.setup()
        render(<MulInter />)
        const incrementButton = screen.getByRole('button', { name: /Increment/i })
        const decrementButton = screen.getByRole('button', { name: /Decrement/i })

        await user.click(incrementButton) 
        await user.click(decrementButton)

        const quantityElement = screen.getByText(/Quantity: 1/i)
        expect(quantityElement).toBeInTheDocument()
    })

    test('does not decrement below 0', async () => {
        const user = userEvent.setup()
        render(<MulInter />)
        const decrementButton = screen.getByRole('button', { name: /Decrement/i })
        await user.click(decrementButton)
        await user.click(decrementButton)
        const quantityElement = screen.getByText(/Quantity: 0/i)
        expect(quantityElement).toBeInTheDocument()
    })
})