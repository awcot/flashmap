import { render, screen } from '@testing-library/react'
import TreeNodeForm from './TreeNodeForm'

fit('is rendered', () => {
  const node = { data: { text: 'Humble node' } }
  render(<TreeNodeForm selectedNode={node} />)
  const textInput = screen.getByRole('textbox', { value: 'Humble node' })
  expect(textInput).toBeInTheDocument()
})
