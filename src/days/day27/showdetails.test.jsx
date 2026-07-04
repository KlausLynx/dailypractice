import { screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShowDetails from './showDetails'

/* eslint-disable */
describe('renders Showdetails component', () => {
    test('the component is not visible', () => {
        render(<ShowDetails />)
        const notVisible = screen.queryByText(/Here are the secret details!/i)
        expect(notVisible).not.toBeInTheDocument()
    })

    test('the component is visible after clicking the button', async() => {
        const user = userEvent.setup()
        render(<ShowDetails />)
        expect(screen.queryByText(/here are the secret details/i)).not.toBeInTheDocument()

        const button = screen.getByRole('button', {name: /show details/i})
        await user.click(button)
        const visible = screen.getByText(/Here are the secret details!/i)
        expect(visible).toBeInTheDocument()
    })
})