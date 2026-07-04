import {render, screen} from '@testing-library/react'
import UserCard from './userCard'

/* eslint-disable */
describe('renders UserCard component', () => {
    test('renders name correctly', () => {
        render(<UserCard name="John Doe" email="" />)
        const nameElement = screen.getByText(/John Doe/i)
        expect(nameElement).toBeInTheDocument()
    })

    test('renders email correctly', () => {
        render(<UserCard name="" email="john.doe@example.com" />)
        const emailElement = screen.getByText(/john.doe@example.com/i)
        expect(emailElement).toBeInTheDocument()
    })
})