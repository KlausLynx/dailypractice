import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './formTest'
/* eslint-disable */
describe('FormTest component', () =>  {
    test('renders empty form correctly', () => {
        render(<Form onSearch={() => {}} />)
        const inputElement = screen.getByRole('textbox', {  name: /search query/i })
        expect(inputElement).toBeInTheDocument()
    })

    test('submitting form calls onSearch with input value', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        render(<Form onSearch={mockOnSearch} />)
        const inputElement = screen.getByRole('textbox', {  name: /search query/i })
        const buttonElement = screen.getByRole('button', { name: /search/i })
        await user.type(inputElement, 'test query')
        await user.click(buttonElement)
        expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
})