import { render, screen } from '@testing-library/react'
import TreeNode from './TreeNode'

it('is rendered', () => {
  const node = { data: { text: 'Humble node' } }
  render(<TreeNode node={node} />)
  expect(screen.getByText('Humble node')).toBeInTheDocument()
})
