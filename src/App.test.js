import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the initial form', () => {
  render(<App />)
  const saveButton = screen.getByText('Save')
  expect(saveButton).toBeInTheDocument()
})
