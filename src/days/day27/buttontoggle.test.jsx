import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonToggle from './buttontoggle'

/* eslint-disable */

describe('ButtonToggle component', () => {
    test('initial state "OFF"', () => {
        render(<ButtonToggle />)
        const buttonElement = screen.getByRole('button', { name: /OFF/i })
        expect(buttonElement).toBeInTheDocument()
    })

    test('clicked state "ON"', async () => {
        const user = userEvent.setup()
        render(<ButtonToggle />)
        const buttonElement = screen.getByRole('button', { name: /OFF/i })
        await user.click(buttonElement)
        expect(buttonElement).toHaveTextContent('ON')
    })
})