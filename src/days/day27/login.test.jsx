// LoginForm.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './login'
/* eslint-disable */

describe('LoginForm', () => {
  test('inputs should be empty at start', () => {
    render(<LoginForm onSubmit={() => {}} />)

    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/password/i)).toHaveValue('')
  })

  test('calls onSubmit with email and password', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()
    render(<LoginForm onSubmit={mockSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')

    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123'
    })
  })
})
