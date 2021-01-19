import { render, screen } from '@testing-library/react'
import App from './App'

xit('renders the initial form', () => {
  render(<App />)
  const saveButton = screen.getByText('Save')
  expect(saveButton).toBeInTheDocument()
})
