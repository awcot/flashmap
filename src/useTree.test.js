import { renderHook, act } from '@testing-library/react-hooks'
import useTree from './useTree'

it('initializes with a single node', () => {
  const { result } = renderHook(() => useTree())

  expect(result.current.tree.nodes.length).toBe(1)
})

it('adds a new node to the root', () => {
  const { result } = renderHook(() => useTree())

  act(() => {
    result.current.actions.addNode(0)
  })

  const [nodeZero, nodeOne] = result.current.tree.nodes
  expect(result.current.tree.nodes.length).toBe(2)
  expect(nodeZero.children).toContain(nodeOne.id)
  expect(nodeOne.parentId).toBe(nodeZero.id)
})

it('saves changes to existing nodes', () => {
  const { result } = renderHook(() => useTree())

  act(() => {
    result.current.actions.saveNode(0, { text: 'Testing node text' })
  })

  expect(result.current.tree.nodes[0].data.text).toBe('Testing node text')
})
