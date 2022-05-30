import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders search field', () => {
  render(<App />)
  const linkElement = screen.getByPlaceholderText(/Enter username/i)
  expect(linkElement).toBeInTheDocument()
})
